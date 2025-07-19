from datetime import datetime, timedelta
from jose import JWTError, jwt
from passlib.context import CryptContext
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from sqlalchemy.orm import Session
from app import models, database
import os
from dotenv import load_dotenv
from fastapi import APIRouter, Form
from typing import Optional
load_dotenv()
print("✅ Loaded SECRET_KEY:", os.getenv("JWT_SECRET_KEY"))
router = APIRouter()

# Dummy DB and user check (replace with real DB logic)
fake_user = {"email": "admin@gmail.com", "password": "admin", "is_admin": True}

SECRET_KEY = os.getenv("JWT_SECRET_KEY")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/auth/login")

# ---------------- Password Utils ----------------
def hash_password(password: str) -> str:
    return pwd_context.hash(password)

def verify_password(plain: str, hashed: str) -> bool:
    return pwd_context.verify(plain, hashed)

# ---------------- Token Utils ----------------
def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    print("🔐 SECRET_KEY (hash):", hash(SECRET_KEY))
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=15)

    to_encode.update({"exp": expire})
    print("🔐 Token Payload:", to_encode)  # DEBUG
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    print("🪪 Encoded JWT:", encoded_jwt)  # DEBUG
    return encoded_jwt

# ---------------- Auth Dependency ----------------
def get_current_user(token: str = Depends(oauth2_scheme), db: Session = Depends(database.get_db)):
    print("🔐 SECRET_KEY (hash):", hash(SECRET_KEY))  # 👈 Add here
    print("🔍 Incoming Token:", token)  # DEBUG

    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Invalid token or credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id: int = payload.get("sub")
        print("✅ Decoded user_id from token:", user_id)  # DEBUG

        if user_id is None:
            print("❌ user_id is None in token payload")  # DEBUG
            raise credentials_exception
    except JWTError as e:
        print("❌ JWT Decode Error:", e)  # DEBUG
        raise credentials_exception

    user = db.query(models.User).filter(models.User.id == user_id).first()
    print("🔍 Queried user from DB:", user)  # DEBUG

    if not user:
        print("❌ No user found with this ID")  # DEBUG
        raise credentials_exception

    return user

def get_admin_user(current_user: models.User = Depends(get_current_user)):
    if not current_user.is_admin:
        raise HTTPException(status_code=403, detail="Admin access required")
    return current_user

@router.post("/auth/login")
def login(username: str = Form(...), password: str = Form(...), db: Session = Depends(database.get_db)):
    user = db.query(models.User).filter(models.User.email == username).first()

    if not user or not verify_password(password, user.password):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    access_token = create_access_token(data={"sub": str(user.id)})
    return {"access_token": access_token, "token_type": "bearer"}
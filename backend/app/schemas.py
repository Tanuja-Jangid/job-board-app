from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime

# -------- USER --------
class UserCreate(BaseModel):
    email: EmailStr
    password: str

class UserOut(BaseModel):
    id: int
    email: EmailStr
    is_admin: bool
    class Config:
        from_attributes  = True

# -------- TOKEN --------
class Token(BaseModel):
    access_token: str
    token_type: str

# -------- JOB --------
class JobBase(BaseModel):
    title: str
    description: str
    location: str
    salary: float
    status: str

class JobCreate(JobBase):
    pass

class JobOut(JobBase):
    id: int
    title: str
    class Config:
        from_attributes  = True

# -------- APPLICATION --------
class ApplicationCreate(BaseModel):
    name: str
    email: EmailStr

class ApplicationOut(BaseModel):
    id: int
    status: str
    created_at: datetime
    job: JobOut
    # job_title: Optional[str] = None
    resume: Optional[str] = None
    resume_url: Optional[str] = None  # 👈 This will be constructed in the API
    name: Optional[str]
    email: Optional[EmailStr]

    class Config:
        from_attributes = True

class UserCreate(BaseModel):
    name: str
    email: str
    password: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str
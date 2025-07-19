from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes import jobs, users, applications
from app.database import Base, engine
from app import models, auth
from fastapi.staticfiles import StaticFiles
import os
from app.application import router as application_router



Base.metadata.create_all(bind=engine)

app = FastAPI()
app.mount("/uploads", StaticFiles(directory="uploads"), name="uploads")
app.include_router(users.router)
app.include_router(auth.router)
app.include_router(application_router)
# Mount resume uploads
app.mount("/resumes", StaticFiles(directory=os.getenv("UPLOAD_DIR", "uploads")), name="resumes")

@app.get("/")
def read_root():
    return {"message": "Job Board API is running 🎉"}
# CORS for frontend connection
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(users.router)
app.include_router(jobs.router)
app.include_router(applications.router)

from fastapi import APIRouter, Depends, UploadFile, File, Form, HTTPException
from sqlalchemy.orm import Session
import shutil
import os
from uuid import uuid4
from app import database, models, schemas
from datetime import datetime
from sqlalchemy import Column, Integer, String, ForeignKey, DateTime
from app.auth import get_current_user
from dotenv import load_dotenv
load_dotenv()

UPLOAD_DIR = os.getenv("UPLOAD_DIR", "uploads")

router = APIRouter(prefix="/applications", tags=["Applications"])

@router.post("/apply/{job_id}", response_model=schemas.ApplicationOut)
def apply_to_job(
    job_id: int,
    name: str = Form(...),
    email: str = Form(...),
    resume: UploadFile = File(...),
    db: Session = Depends(database.get_db),
    current_user: models.User = Depends(get_current_user),
):
    print(f"📥 Received application for job ID: {job_id}")
    print(f"👤 Applicant: {name}, Email: {email}")

    # ✅ Enforce application limit
    existing_applications = db.query(models.Application).filter(
        models.Application.user_id == current_user.id,
        models.Application.name == name,
        models.Application.email == email
    ).count()

    print(f"🔢 Existing applications for user: {existing_applications}")
    if existing_applications >= 5:
        print("❌ Maximum number of applications (5) reached for this user.")
        raise HTTPException(
            status_code=400,
            detail=f"❌ Maximum number of applications (5) reached for this user."
        )

    # ✅ Validate job existence
    job = db.query(models.Job).filter(models.Job.id == job_id).first()
    if not job or job.status != "Active":
        raise HTTPException(status_code=404, detail="Job not found or closed")
    print(f"✅ Job exists and is active: {job.title}")

    # ✅ Save resume
    file_ext = resume.filename.split('.')[-1]
    file_name = f"{uuid4().hex}.{file_ext}"
    save_path = os.path.join(UPLOAD_DIR, file_name)
    print(f"💾 Saving resume as: {file_name}")
    print(f"📂 Full save path: {save_path}")

    with open(save_path, "wb") as buffer:
        shutil.copyfileobj(resume.file, buffer)
    print("✅ Resume file saved successfully!")

    # ✅ Create application record
    application = models.Application(
        name=name,
        email=email,
        resume=file_name,
        job_id=job_id,
        user_id=current_user.id,
        status="submitted",
        created_at=datetime.now()
    )
    db.add(application)
    db.commit()
    db.refresh(application)
    print(f"✅ Application stored in DB with ID: {application.id}")
    print(f"🔗 Resume URL would be: /uploads/{file_name}")

    return application


# Optional: Get all applications for a job (admin only)
@router.get("/job/{job_id}", response_model=list[schemas.ApplicationOut])
def get_applications(job_id: int, db: Session = Depends(database.get_db)):
    return db.query(models.Application).filter(models.Application.job_id == job_id).all()

@router.get("/applications/", response_model=list[schemas.ApplicationOut])
def get_all_applications(db: Session = Depends(database.get_db)):
    apps = db.query(models.Application).all()
    print(f"✅ Total applications fetched from DB: {len(apps)}")
    for app in apps:
        print(f"📝 App ID: {app.id}, Job: {app.job}, Job ID: {app.job_id}")
    return apps


@router.get("/my-applications/", response_model=list[schemas.ApplicationOut])
def get_user_applications(
    db: Session = Depends(database.get_db),
    current_user: models.User = Depends(get_current_user)
):
    print("🔍 Incoming Token for user_id:", current_user.id)

    # Fetch applications for this user
    user_apps = db.query(models.Application).filter(models.Application.user_id == current_user.id).all()

    print(f"✅ Applications returned for user_id {current_user.id}: {len(user_apps)} applications")

    return user_apps

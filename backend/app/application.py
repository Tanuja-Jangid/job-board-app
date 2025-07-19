from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app import models, schemas, database
from app.auth import get_current_user
from app.database import get_db
from sqlalchemy.orm import joinedload
from fastapi import APIRouter, Depends, Request

router = APIRouter(prefix="/applications", tags=["Applications"])

@router.get("/", response_model=List[schemas.ApplicationOut])
def get_user_applications(
    request: Request,
    current_user: models.User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    print(f"➡️ User ID: {current_user.id}")

    applications = db.query(models.Application).options(
        joinedload(models.Application.job)
    ).filter(
        models.Application.user_id == current_user.id
    ).all()

    print(f"📄 Found {len(applications)} applications")

    result = []
    for app in applications:
        print(f"📝 Application ID: {app.id}")
        print(f"   Job Title: {app.job.title if app.job else 'N/A'}")
        print(f"   Resume filename: {app.resume}")

        resume_url = None
        if app.resume:
            resume_url = f"{request.base_url}uploads/{app.resume}"
            print(f"   Resume URL: {resume_url}")
        else:
            print("   ❌ No resume uploaded for this application")

        result.append({
            "id": app.id,
            "name": app.name,
            "email": app.email,
            "status": app.status,
            "created_at": app.created_at,
            "job": app.job,
            "resume": app.resume,
            "resume_url": resume_url,
        })

        print(f"   Applicant Name: {app.name}, Email: {app.email}")

    print("✅ Returning application list")
    return result


@router.get("/all-applications/", response_model=List[schemas.ApplicationOut])
def get_all_applications(
    request: Request,
    current_user: models.User = Depends(get_current_user),  # you can keep auth here or make it optional
    db: Session = Depends(get_db)
):
    print("Fetching all applications for admin")

    applications = db.query(models.Application).options(
        joinedload(models.Application.job)
    ).all()  # no filter on user_id

    print(f"Found {len(applications)} applications")

    result = []
    for app in applications:
        resume_url = None
        if app.resume:
            resume_url = f"{request.base_url}uploads/{app.resume}"

        result.append({
            "id": app.id,
            "name": app.name,
            "email": app.email,
            "status": app.status,
            "created_at": app.created_at,
            "job": app.job,
            "resume": app.resume,
            "resume_url": resume_url,
        })

    return result
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app import database, models, schemas, auth

router = APIRouter(prefix="/jobs", tags=["Jobs"])

# 📌 GET - Public: List all jobs (for users)
@router.get("/", response_model=list[schemas.JobOut])
def get_all_jobs(db: Session = Depends(database.get_db)):
    return db.query(models.Job).all()

# 📌 POST - Admin: Create a job
@router.post("/", response_model=schemas.JobOut)
def create_job(job: schemas.JobCreate, db: Session = Depends(database.get_db), current_user: models.User = Depends(auth.get_admin_user)):
    new_job = models.Job(**job.dict())
    db.add(new_job)
    db.commit()
    db.refresh(new_job)
    return new_job

# 📌 PUT - Admin: Update a job
@router.put("/{job_id}", response_model=schemas.JobOut)
def update_job(job_id: int, updated: schemas.JobCreate, db: Session = Depends(database.get_db), current_user: models.User = Depends(auth.get_admin_user)):
    job = db.query(models.Job).filter(models.Job.id == job_id).first()
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")
    for field, value in updated.dict().items():
        setattr(job, field, value)
    db.commit()
    db.refresh(job)
    return job

# 📌 DELETE - Admin: Delete a job
@router.delete("/{job_id}")
def delete_job(job_id: int, db: Session = Depends(database.get_db), current_user: models.User = Depends(auth.get_admin_user)):
    job = db.query(models.Job).filter(models.Job.id == job_id).first()
    if not job:
        raise HTTPException(status_code=404, detail="Job not found")
    db.delete(job)
    db.commit()
    return {"detail": f"Job ID {job_id} deleted"}


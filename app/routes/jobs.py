from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.database import get_db
from app.models import JobApplication, JobStatus
from app.auth import get_current_user
from pydantic import BaseModel, ConfigDict
from typing import List, Optional
from datetime import date
import uuid

router = APIRouter()

class JobCreate(BaseModel):
    company: str
    position: str
    status: JobStatus
    date_applied: date
    notes: Optional[str] = None

class JobResponse(BaseModel):
    id: str
    company: str
    position: str
    status: JobStatus
    date_applied: date
    notes: Optional[str]

    model_config = ConfigDict(from_attributes=True)

@router.post("/jobs/", response_model=JobResponse, status_code=status.HTTP_201_CREATED)
def create_job(job_data: JobCreate, db: Session = Depends(get_db), user=Depends(get_current_user)):
    new_job = JobApplication(
        id=str(uuid.uuid4()),
        user_id=user.id,
        company=job_data.company,
        position=job_data.position,
        status=job_data.status,
        date_applied=job_data.date_applied,
        notes=job_data.notes
    )

    db.add(new_job)
    db.commit()
    db.refresh(new_job)

    return new_job

@router.get("/jobs/", response_model=List[JobResponse])
def get_jobs(
    db: Session = Depends(get_db), 
    user=Depends(get_current_user)
):
    jobs = db.query(JobApplication).filter(JobApplication.user_id == user.id).all()
    return jobs

@router.get("/jobs/{job_id}", response_model=JobResponse)
def get_job(
    job_id: str, 
    db: Session = Depends(get_db), 
    user=Depends(get_current_user)
):
    job = db.query(JobApplication).filter(JobApplication.id == job_id, JobApplication.user_id == user.id).first()

    if not job:
        raise HTTPException(status_code=404, detail="Job not found")
    
    return job

@router.put("/jobs/{job_id}", response_model=JobResponse)
def update_job(
    job_id: str, 
    job_data: JobCreate, 
    db: Session = Depends(get_db), 
    user=Depends(get_current_user)
):
    job = db.query(JobApplication).filter(JobApplication.id == job_id, JobApplication.user_id == user.id).first()

    if not job:
        raise HTTPException(status_code=404, detail="Job not found")
    
    job.company = job_data.company
    job.position = job_data.position
    job.status = job_data.status
    job.date_applied = job_data.date_applied
    job.notes = job_data.notes
    
    db.commit()
    db.refresh(job)

    return job

@router.delete("/jobs/{job_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_job(job_id: str, db: Session = Depends(get_db), user=Depends(get_current_user)):
    job = db.query(JobApplication).filter(JobApplication.id == job_id, JobApplication.user_id == user.id).first()

    if not job:
        raise HTTPException(status_code=404, detail="Job not found")
    
    db.delete(job)
    db.commit()

    return

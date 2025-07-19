from sqlalchemy import Column, Integer, String, Text, Float, ForeignKey
from sqlalchemy.orm import relationship
from app.database import Base
from datetime import datetime
from sqlalchemy import Column, Integer, String, ForeignKey, DateTime
from sqlalchemy import Column, Integer, String, Boolean, ForeignKey
from sqlalchemy.orm import relationship
from app.database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    password = Column(String, nullable=False)
    is_admin = Column(Boolean, default=False)  # Optional: only if you plan to use this

    applications = relationship("Application", back_populates="user", cascade="all, delete")


class Job(Base):
    __tablename__ = "jobs"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String)
    company = Column(String)
    location = Column(String)
    description = Column(String)
    salary = Column(Integer)
    status = Column(String)

    applications = relationship("Application", back_populates="job")  # ✅ This line fixes your error


class Application(Base):
    __tablename__ = "applications"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    email = Column(String)
    resume_url = Column(String)
    job_id = Column(Integer, ForeignKey("jobs.id"))
    user_id = Column(Integer, ForeignKey("users.id"))
    status = Column(String)
    created_at = Column(DateTime, default=datetime.utcnow)
    resume = Column(String, nullable=True)
    user = relationship("User", back_populates="applications")
    # job = relationship("Job", back_populates="applications")  # ✅ This must match the Job model
    # job = relationship("Job")
    job = relationship("Job", back_populates="applications")  # ✅ MUST EXIST

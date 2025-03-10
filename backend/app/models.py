from sqlalchemy import Column, String, Date, Enum, ForeignKey
from sqlalchemy.orm import relationship
import uuid
from app.database import Base
import enum

class JobStatus(str, enum.Enum):
    APPLIED = "Applied"
    INTERVIEW = "Interview"
    OFFER = "Offer"
    REJECTED = "Rejected"

class User(Base):
    __tablename__ = "users"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    email = Column(String, unique=True, nullable=False)
    password = Column(String, nullable=False)

    jobs = relationship("JobApplication", back_populates="user", cascade="all, delete")

class JobApplication(Base):
    __tablename__ = "jobs"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = Column(String, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    company = Column(String, nullable=False)
    position = Column(String, nullable=False)
    status = Column(Enum(JobStatus), default=JobStatus.APPLIED)
    date_applied = Column(Date, nullable=False)
    notes = Column(String, nullable=True)

    user = relationship("User", back_populates="jobs")

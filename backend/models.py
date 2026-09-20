from sqlalchemy import Column, Integer, String, Text, DateTime
from datetime import datetime
from database import Base

class AdminModel(Base):
    __tablename__ = "admins"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    email = Column(String(100), unique=True, nullable=False)
    password = Column(String(100), nullable=False)  # In production, use hashed passwords

class DoctorModel(Base):
    __tablename__ = "doctors"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    doctor_name = Column(String(100), nullable=False)
    specialty = Column(String(100), nullable=False)
    experience = Column(String(50), nullable=False)
    phone = Column(String(20), nullable=False)

class DepartmentModel(Base):
    __tablename__ = "departments"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    department_name = Column(String(100), nullable=False)
    department_head = Column(String(100), nullable=False)
    room_numbers = Column(String(50), nullable=False)

class AppointmentModel(Base):
    __tablename__ = "appointments"

    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    patient_name = Column(String(100), nullable=False)
    age_gender = Column(String(50), nullable=False)
    phone = Column(String(20), nullable=False)
    department = Column(String(50), nullable=False)
    date = Column(String(30), nullable=False)
    status = Column(String(20), default="Pending")  # Pending / Confirmed
    created_at = Column(DateTime, default=datetime.utcnow)
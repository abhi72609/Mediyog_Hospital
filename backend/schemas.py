from pydantic import BaseModel, EmailStr
from typing import Optional

class AdminLogin(BaseModel):
    email: EmailStr
    password: str

class DoctorCreate(BaseModel):
    doctorName: Optional[str] = None
    doctor_name: Optional[str] = None
    specialty: str
    experience: str
    phone: str

class DepartmentCreate(BaseModel):
    departmentName: Optional[str] = None
    department_name: Optional[str] = None
    departmentHead: Optional[str] = None
    department_head: Optional[str] = None
    rooms: Optional[str] = None
    roomNumbers: Optional[str] = None

class AppointmentCreate(BaseModel):
    patientName: Optional[str] = None
    name: Optional[str] = None
    ageGender: Optional[str] = None
    phone: str
    department: Optional[str] = None
    dept: Optional[str] = None
    date: str
    status: Optional[str] = "Pending"

class AppointmentStatusUpdate(BaseModel):
    status: str
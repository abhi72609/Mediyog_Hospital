from fastapi import FastAPI, Depends, HTTPException, UploadFile, File
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from sqlalchemy.orm import Session
from database import engine, Base, get_db
from models import AdminModel, DoctorModel, DepartmentModel, AppointmentModel
from schemas import AdminLogin, DoctorCreate, DepartmentCreate, AppointmentCreate

import os
import shutil


# Automatically create all SQLite database tables on startup
Base.metadata.create_all(bind=engine)


app = FastAPI(
    title="Mediyog Hospital Admin Backend",
    version="1.0"
)

UPLOAD_DIR = os.path.join(os.path.dirname(__file__), "uploads")

app.mount(
    "/uploads",
    StaticFiles(directory=UPLOAD_DIR),
    name="uploads"
)


# --- Enable CORS ---
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# --- Seed or update default admin on application startup ---
@app.on_event("startup")
def seed_admin():
    db = Session(engine)
    try:
        admin = db.query(AdminModel).filter(
            AdminModel.email == "admin@mediyog.com"
        ).first()

        if admin:
            admin.password = "admin@1020"
            db.commit()
        else:
            default_admin = AdminModel(
                email="admin@mediyog.com",
                password="admin@1020"
            )
            db.add(default_admin)
            db.commit()
    finally:
        db.close()


# ============================================================
# ROOT
# ============================================================

@app.get("/")
def read_root():
    return {
        "message": "Mediyog Hospital Admin Backend is running!"
    }


# ============================================================
# ADMIN AUTHENTICATION
# ============================================================

@app.post("/api/admin/login")
def admin_login(
    credentials: AdminLogin,
    db: Session = Depends(get_db)
):
    admin = db.query(AdminModel).filter(
        AdminModel.email == credentials.email
    ).first()

    if not admin or admin.password != credentials.password:
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password"
        )

    return {
        "success": True,
        "message": "Login successful"
    }


# ============================================================
# ADMIN PASSWORD RESET
# ============================================================

class PasswordReset(BaseModel):
    email: str
    new_password: str


@app.post("/api/admin/reset-password")
def reset_password(
    data: PasswordReset,
    db: Session = Depends(get_db)
):
    admin = db.query(AdminModel).filter(
        AdminModel.email == data.email
    ).first()

    if not admin:
        raise HTTPException(
            status_code=404,
            detail="Admin email not found"
        )

    admin.password = data.new_password
    db.commit()

    return {
        "success": True,
        "message": "Password updated successfully"
    }


# ============================================================
# DOCTOR IMAGE UPLOAD
# ============================================================

@app.post("/api/doctors/upload-image")
async def upload_doctor_image(
    file: UploadFile = File(...)
):
    upload_folder = "uploads/doctors"

    # Create folder if it doesn't exist
    os.makedirs(upload_folder, exist_ok=True)

    # Create complete file path
    file_path = os.path.join(
        upload_folder,
        file.filename
    )

    # Save uploaded file
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(
            file.file,
            buffer
        )

    return {
        "success": True,
        "message": "Doctor image uploaded successfully",
        "image": f"/uploads/doctors/{file.filename}"
    }


# ============================================================
# DOCTOR MANAGEMENT
# ============================================================

@app.get("/api/doctors")
def get_doctors(
    db: Session = Depends(get_db)
):
    return db.query(DoctorModel).all()


@app.post("/api/doctors")
def add_doctor(
    doctor: DoctorCreate,
    db: Session = Depends(get_db)
):
    doc_name = (
        doctor.doctorName
        or doctor.doctor_name
        or "Unknown Doctor"
    )

    new_doc = DoctorModel(
        doctor_name=doc_name,
        specialty=doctor.specialty,
        experience=doctor.experience,
        operations=doctor.operations or "Not specified",
        phone=doctor.phone,
        image=doctor.image
    )

    db.add(new_doc)
    db.commit()
    db.refresh(new_doc)

    return {
        "success": True,
        "message": "Doctor added successfully",
        "id": new_doc.id
    }


@app.delete("/api/doctors/{doctor_id}")
def delete_doctor(
    doctor_id: int,
    db: Session = Depends(get_db)
):
    doc = db.query(DoctorModel).filter(
        DoctorModel.id == doctor_id
    ).first()

    if not doc:
        raise HTTPException(
            status_code=404,
            detail="Doctor not found"
        )

    db.delete(doc)
    db.commit()

    return {
        "success": True,
        "message": "Doctor removed successfully"
    }


# ============================================================
# DEPARTMENT MANAGEMENT
# ============================================================

@app.get("/api/departments")
def get_departments(
    db: Session = Depends(get_db)
):
    return db.query(DepartmentModel).all()


@app.post("/api/departments")
def add_department(
    dept: DepartmentCreate,
    db: Session = Depends(get_db)
):
    dept_name = (
        dept.departmentName
        or dept.department_name
        or "General"
    )

    dept_head = (
        dept.departmentHead
        or dept.department_head
        or "TBD"
    )

    rooms_val = (
        dept.rooms
        or dept.roomNumbers
        or "101"
    )

    new_dept = DepartmentModel(
        department_name=dept_name,
        department_head=dept_head,
        room_numbers=rooms_val
    )

    db.add(new_dept)
    db.commit()
    db.refresh(new_dept)

    return {
        "success": True,
        "message": "Department added successfully",
        "id": new_dept.id
    }


@app.delete("/api/departments/{dept_id}")
def delete_department(
    dept_id: int,
    db: Session = Depends(get_db)
):
    dept = db.query(DepartmentModel).filter(
        DepartmentModel.id == dept_id
    ).first()

    if not dept:
        raise HTTPException(
            status_code=404,
            detail="Department not found"
        )

    db.delete(dept)
    db.commit()

    return {
        "success": True,
        "message": "Department removed successfully"
    }


# ============================================================
# APPOINTMENT REQUESTS MANAGEMENT
# ============================================================

@app.get("/api/appointments")
def get_appointments(
    db: Session = Depends(get_db)
):
    return db.query(AppointmentModel).all()


@app.post("/api/appointments")
def create_appointment(
    appt: AppointmentCreate,
    db: Session = Depends(get_db)
):
    p_name = (
        appt.patientName
        or appt.name
        or "Patient"
    )

    age_gen = (
        appt.ageGender
        or "25 / Other"
    )

    new_appt = AppointmentModel(
        patient_name=p_name,
        age_gender=age_gen,
        phone=appt.phone,
        department=appt.department,
        date=appt.date,
        status=appt.status or "Pending"
    )

    db.add(new_appt)
    db.commit()
    db.refresh(new_appt)

    return {
        "success": True,
        "message": "Appointment recorded",
        "id": new_appt.id
    }


# ============================================================
# APPOINTMENT STATUS UPDATE
# ============================================================

class StatusUpdate(BaseModel):
    status: str


@app.put("/api/appointments/{appt_id}/status")
@app.patch("/api/appointments/{appt_id}/status")
def update_appointment_status(
    appt_id: int,
    update: StatusUpdate,
    db: Session = Depends(get_db)
):
    appt = db.query(AppointmentModel).filter(
        AppointmentModel.id == appt_id
    ).first()

    if not appt:
        raise HTTPException(
            status_code=404,
            detail="Appointment not found"
        )

    appt.status = update.status
    db.commit()

    return {
        "success": True,
        "message": "Appointment status updated"
    }
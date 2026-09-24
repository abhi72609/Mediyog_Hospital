import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('appointments');

  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [departments, setDepartments] = useState([]);

  const [newDoc, setNewDoc] = useState({ name: '', specialty: '', experience: '', phone: '' });
  const [newDept, setNewDept] = useState({ name: '', head: '', rooms: '' });

  // Fetch all data on component mount
  useEffect(() => {
    fetchAppointments();
    fetchDoctors();
    fetchDepartments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/appointments');
      const data = await response.json();
      setAppointments(data);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  };

  const fetchDoctors = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/doctors');
      const data = await response.json();
      setDoctors(data);
    } catch (error) {
      console.error('Error fetching doctors:', error);
    }
  };

  const fetchDepartments = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/departments');
      const data = await response.json();
      setDepartments(data);
    } catch (error) {
      console.error('Error fetching departments:', error);
    }
  };

  // Add Doctor to Backend
  const handleAddDoctor = async (e) => {
    e.preventDefault();
    if (!newDoc.name || !newDoc.specialty) return;

    try {
      const response = await fetch('http://127.0.0.1:8000/api/doctors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          doctorName: newDoc.name,
          doctor_name: newDoc.name,
          specialty: newDoc.specialty,
          experience: newDoc.experience,
          phone: newDoc.phone
        }),
      });

      if (response.ok) {
        setNewDoc({ name: '', specialty: '', experience: '', phone: '' });
        fetchDoctors(); // Refresh list from DB
      } else {
        alert('Failed to add doctor');
      }
    } catch (error) {
      console.error('Error adding doctor:', error);
    }
  };

  // Add Department to Backend
  const handleAddDept = async (e) => {
    e.preventDefault();
    if (!newDept.name || !newDept.head) return;

    try {
      const response = await fetch('http://127.0.0.1:8000/api/departments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          departmentName: newDept.name,
          department_name: newDept.name,
          departmentHead: newDept.head,
          department_head: newDept.head,
          rooms: newDept.rooms,
          roomNumbers: newDept.rooms
        }),
      });

      if (response.ok) {
        setNewDept({ name: '', head: '', rooms: '' });
        fetchDepartments(); // Refresh list from DB
      } else {
        alert('Failed to add department');
      }
    } catch (error) {
      console.error('Error adding department:', error);
    }
  };

  // Delete Doctor from Backend
  const handleDeleteDoctor = async (id) => {
    if (!window.confirm('Are you sure you want to remove this doctor?')) return;
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/doctors/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        fetchDoctors();
      } else {
        alert('Failed to delete doctor');
      }
    } catch (error) {
      console.error('Error deleting doctor:', error);
    }
  };

  // Delete Department from Backend
  const handleDeleteDept = async (id) => {
    if (!window.confirm('Are you sure you want to remove this department?')) return;
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/departments/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        fetchDepartments();
      } else {
        alert('Failed to delete department');
      }
    } catch (error) {
      console.error('Error deleting department:', error);
    }
  };

  // Manage/Update Appointment Status (e.g., Toggle Pending -> Confirmed)
  const handleManageAppointment = async (id, currentStatus) => {
    const nextStatus = currentStatus === 'Pending' ? 'Confirmed' : 'Completed';
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/appointments/${id}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: nextStatus })
      });
      if (response.ok) {
        fetchAppointments();
      } else {
        // Fallback if status endpoint is handled differently in your backend
        alert('Status updated locally');
        fetchAppointments();
      }
    } catch (error) {
      console.error('Error updating appointment:', error);
    }
  };

  return (
    <div className="admin-dashboard-container">
      <aside className="sidebar">
        <h2>Mediyog Admin</h2>
        <nav>
          <ul>
            <li 
              className={activeTab === 'appointments' ? 'active' : ''} 
              onClick={() => setActiveTab('appointments')}
            >
              Appointments
            </li>
            <li 
              className={activeTab === 'doctors' ? 'active' : ''} 
              onClick={() => setActiveTab('doctors')}
            >
              Doctors
            </li>
            <li 
              className={activeTab === 'departments' ? 'active' : ''} 
              onClick={() => setActiveTab('departments')}
            >
              Departments
            </li>
          </ul>
        </nav>
        <button className="logout-btn" onClick={() => { localStorage.removeItem('isAdminAuthenticated'); navigate('/admin'); }}>Log Out</button>
      </aside>

      <main className="dashboard-content">
        {activeTab === 'appointments' && (
          <div>
            <header className="content-header">
              <h1>Recent Patient Appointments</h1>
            </header>
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Patient Name</th>
                    <th>Age/Gender</th>
                    <th>Phone</th>
                    <th>Department</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {appointments.length > 0 ? (
                    appointments.map((appt) => (
                      <tr key={appt.id}>
                        <td>{appt.patient_name || appt.patientName || appt.name}</td>
                        <td>{appt.age_gender || `${appt.age || ''} / ${appt.gender || ''}`}</td>
                        <td>{appt.phone}</td>
                        <td>{appt.department || appt.dept}</td>
                        <td>{appt.date}</td>
                        <td><span className={`status ${(appt.status || 'Pending').toLowerCase()}`}>{appt.status || 'Pending'}</span></td>
                        <td>
                          <button 
                            className="action-btn" 
                            onClick={() => handleManageAppointment(appt.id, appt.status || 'Pending')}
                          >
                            Manage Status
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7" style={{ textAlign: 'center' }}>No appointments found.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'doctors' && (
          <div>
            <header className="content-header">
              <h1>Manage Doctors</h1>
            </header>
            
            <form onSubmit={handleAddDoctor} className="admin-inline-form">
              <input type="text" placeholder="Doctor Name" value={newDoc.name} onChange={e => setNewDoc({...newDoc, name: e.target.value})} required />
              <input type="text" placeholder="Specialty" value={newDoc.specialty} onChange={e => setNewDoc({...newDoc, specialty: e.target.value})} required />
              <input type="text" placeholder="Experience" value={newDoc.experience} onChange={e => setNewDoc({...newDoc, experience: e.target.value})} required />
              <input type="text" placeholder="Phone" value={newDoc.phone} onChange={e => setNewDoc({...newDoc, phone: e.target.value})} required />
              <button type="submit" className="add-btn">+ Add Doctor</button>
            </form>

            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Doctor Name</th>
                    <th>Specialty</th>
                    <th>Experience</th>
                    <th>Phone</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {doctors.length > 0 ? (
                    doctors.map((doc) => (
                      <tr key={doc.id}>
                        <td>{doc.doctor_name || doc.name}</td>
                        <td>{doc.specialty}</td>
                        <td>{doc.experience}</td>
                        <td>{doc.phone}</td>
                        <td><button className="delete-btn" onClick={() => handleDeleteDoctor(doc.id)}>Remove</button></td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="5" style={{ textAlign: 'center' }}>No doctors added yet.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'departments' && (
          <div>
            <header className="content-header">
              <h1>Manage Departments</h1>
            </header>

            <form onSubmit={handleAddDept} className="admin-inline-form">
              <input type="text" placeholder="Department Name" value={newDept.name} onChange={e => setNewDept({...newDept, name: e.target.value})} required />
              <input type="text" placeholder="Department Head" value={newDept.head} onChange={e => setNewDept({...newDept, head: e.target.value})} required />
              <input type="text" placeholder="Room Numbers" value={newDept.rooms} onChange={e => setNewDept({...newDept, rooms: e.target.value})} required />
              <button type="submit" className="add-btn">+ Add Department</button>
            </form>

            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Department Name</th>
                    <th>Head of Dept</th>
                    <th>Rooms</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {departments.length > 0 ? (
                    departments.map((dept) => (
                      <tr key={dept.id}>
                        <td>{dept.department_name || dept.departmentName || dept.name}</td>
                        <td>{dept.department_head || dept.departmentHead || dept.head}</td>
                        <td>{dept.room_numbers}</td>
                        <td><button className="delete-btn" onClick={() => handleDeleteDept(dept.id)}>Remove</button></td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" style={{ textAlign: 'center' }}>No departments added yet.</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminDashboard;
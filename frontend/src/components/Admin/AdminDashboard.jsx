import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('appointments');

  const [appointments, setAppointments] = useState([
    { id: 1, name: 'Harshit', age: 23, gender: 'Male', phone: '1234567891', dept: 'General Checkup', date: '2026-09-17', status: 'Pending' },
    { id: 2, name: 'Sarah Connor', age: 45, gender: 'Female', phone: '9876543210', dept: 'Cardiology', date: '2026-09-18', status: 'Confirmed' }
  ]);

  const [doctors, setDoctors] = useState([
    { id: 1, name: 'Dr. Ramesh Kumar', specialty: 'Cardiology', experience: '10 Years', phone: '9811122233' },
    { id: 2, name: 'Dr. Priya Sharma', specialty: 'Neurology', experience: '8 Years', phone: '9822233344' }
  ]);

  const [departments, setDepartments] = useState([
    { id: 1, name: 'Cardiology', head: 'Dr. Ramesh Kumar', rooms: '201 - 205' },
    { id: 2, name: 'Neurology', head: 'Dr. Priya Sharma', rooms: '301 - 305' },
    { id: 3, name: 'General Checkup', head: 'Dr. Amit Verma', rooms: '101 - 104' }
  ]);

  const [newDoc, setNewDoc] = useState({ name: '', specialty: '', experience: '', phone: '' });
  const [newDept, setNewDept] = useState({ name: '', head: '', rooms: '' });

  const handleAddDoctor = (e) => {
    e.preventDefault();
    if (!newDoc.name || !newDoc.specialty) return;
    setDoctors([...doctors, { id: Date.now(), ...newDoc }]);
    setNewDoc({ name: '', specialty: '', experience: '', phone: '' });
  };

  const handleAddDept = (e) => {
    e.preventDefault();
    if (!newDept.name || !newDept.head) return;
    setDepartments([...departments, { id: Date.now(), ...newDept }]);
    setNewDept({ name: '', head: '', rooms: '' });
  };

  const handleDeleteDoctor = (id) => {
    setDoctors(doctors.filter(doc => doc.id !== id));
  };

  const handleDeleteDept = (id) => {
    setDepartments(departments.filter(dept => dept.id !== id));
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
        <button className="logout-btn" onClick={() => navigate('/admin')}>Log Out</button>
      </aside>

      <main className="dashboard-content">
        {activeTab === 'appointments' && (
          <div>
            <header className="content-header">
              <h1>Recent Appointments</h1>
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
                  {appointments.map((appt) => (
                    <tr key={appt.id}>
                      <td>{appt.name}</td>
                      <td>{appt.age} / {appt.gender}</td>
                      <td>{appt.phone}</td>
                      <td>{appt.dept}</td>
                      <td>{appt.date}</td>
                      <td><span className={`status ${appt.status.toLowerCase()}`}>{appt.status}</span></td>
                      <td><button className="action-btn">Manage</button></td>
                    </tr>
                  ))}
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
                  {doctors.map((doc) => (
                    <tr key={doc.id}>
                      <td>{doc.name}</td>
                      <td>{doc.specialty}</td>
                      <td>{doc.experience}</td>
                      <td>{doc.phone}</td>
                      <td><button className="delete-btn" onClick={() => handleDeleteDoctor(doc.id)}>Remove</button></td>
                    </tr>
                  ))}
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
                  {departments.map((dept) => (
                    <tr key={dept.id}>
                      <td>{dept.name}</td>
                      <td>{dept.head}</td>
                      <td>{dept.rooms}</td>
                      <td><button className="delete-btn" onClick={() => handleDeleteDept(dept.id)}>Remove</button></td>
                    </tr>
                  ))}
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
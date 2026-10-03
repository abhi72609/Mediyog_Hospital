import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminDashboard.css';

const API_URL = 'http://127.0.0.1:8000';

const AdminDashboard = () => {
  const navigate = useNavigate();

  // --------------------------------------------------
  // ACTIVE TAB
  // --------------------------------------------------

  const [activeTab, setActiveTab] = useState('appointments');

  // --------------------------------------------------
  // DATA
  // --------------------------------------------------

  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [departments, setDepartments] = useState([]);

  // --------------------------------------------------
  // NEW DOCTOR FORM
  // --------------------------------------------------

  const [newDoc, setNewDoc] = useState({
    name: '',
    specialty: '',
    experience: '',
    operations: '',
    phone: '',
    image: null
  });

  // --------------------------------------------------
  // NEW DEPARTMENT FORM
  // --------------------------------------------------

  const [newDept, setNewDept] = useState({
    name: '',
    head: '',
    rooms: ''
  });

  const [isAddingDoctor, setIsAddingDoctor] = useState(false);

  // --------------------------------------------------
  // FETCH ALL DATA
  // --------------------------------------------------

  useEffect(() => {
    fetchAppointments();
    fetchDoctors();
    fetchDepartments();
  }, []);

  // --------------------------------------------------
  // FETCH APPOINTMENTS
  // --------------------------------------------------

  const fetchAppointments = async () => {
    try {
      const response = await fetch(`${API_URL}/api/appointments`);

      if (!response.ok) {
        throw new Error('Failed to fetch appointments');
      }

      const data = await response.json();

      setAppointments(data);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  };

  // --------------------------------------------------
  // FETCH DOCTORS
  // --------------------------------------------------

  const fetchDoctors = async () => {
    try {
      const response = await fetch(`${API_URL}/api/doctors`);

      if (!response.ok) {
        throw new Error('Failed to fetch doctors');
      }

      const data = await response.json();

      setDoctors(data);
    } catch (error) {
      console.error('Error fetching doctors:', error);
    }
  };

  // --------------------------------------------------
  // FETCH DEPARTMENTS
  // --------------------------------------------------

  const fetchDepartments = async () => {
    try {
      const response = await fetch(`${API_URL}/api/departments`);

      if (!response.ok) {
        throw new Error('Failed to fetch departments');
      }

      const data = await response.json();

      setDepartments(data);
    } catch (error) {
      console.error('Error fetching departments:', error);
    }
  };

  // --------------------------------------------------
  // ADD DOCTOR
  // --------------------------------------------------

  const handleAddDoctor = async (e) => {
    e.preventDefault();

    // Basic validation
    if (!newDoc.name || !newDoc.specialty) {
      alert('Please enter doctor name and specialty.');
      return;
    }

    try {
      setIsAddingDoctor(true);

      let imagePath = null;

      // ----------------------------------------------
      // STEP 1: UPLOAD DOCTOR IMAGE
      // ----------------------------------------------

      if (newDoc.image) {
        const imageFormData = new FormData();

        imageFormData.append('file', newDoc.image);

        const uploadResponse = await fetch(
          `${API_URL}/api/doctors/upload-image`,
          {
            method: 'POST',
            body: imageFormData
          }
        );

        if (!uploadResponse.ok) {
          const errorData = await uploadResponse.json().catch(() => null);

          throw new Error(
            errorData?.detail || 'Doctor image upload failed'
          );
        }

        const uploadData = await uploadResponse.json();

        console.log('Image upload response:', uploadData);

        // Backend returns:
        // /uploads/doctors/filename.png

        imagePath = uploadData.image;

        if (!imagePath) {
          throw new Error('Image path was not returned by backend');
        }
      }

      // ----------------------------------------------
      // STEP 2: SAVE DOCTOR DETAILS
      // ----------------------------------------------

      const response = await fetch(`${API_URL}/api/doctors`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          doctorName: newDoc.name,
          doctor_name: newDoc.name,
          specialty: newDoc.specialty,
          experience: newDoc.experience,
          operations: newDoc.operations || 'Not specified',
          phone: newDoc.phone,
          image: imagePath
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.detail || 'Failed to add doctor'
        );
      }

      console.log('Doctor created:', data);

      // ----------------------------------------------
      // SUCCESS
      // ----------------------------------------------

      alert('Doctor added successfully!');

      // ----------------------------------------------
      // RESET FORM
      // ----------------------------------------------

      setNewDoc({
        name: '',
        specialty: '',
        experience: '',
        operations: '',
        phone: '',
        image: null
      });

      // Reset file input
      const fileInput = document.getElementById(
        'doctor-image-input'
      );

      if (fileInput) {
        fileInput.value = '';
      }

      // ----------------------------------------------
      // REFRESH DOCTOR LIST
      // ----------------------------------------------

      await fetchDoctors();

    } catch (error) {
      console.error('Error adding doctor:', error);

      alert(
        error.message ||
        'Something went wrong while adding doctor.'
      );

    } finally {
      setIsAddingDoctor(false);
    }
  };

  // --------------------------------------------------
  // ADD DEPARTMENT
  // --------------------------------------------------

  const handleAddDept = async (e) => {
    e.preventDefault();

    if (!newDept.name || !newDept.head) {
      alert(
        'Please enter department name and department head.'
      );
      return;
    }

    try {
      const response = await fetch(
        `${API_URL}/api/departments`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            departmentName: newDept.name,
            departmentHead: newDept.head,
            rooms: newDept.rooms
          })
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.detail || 'Failed to add department'
        );
      }

      alert('Department added successfully!');

      setNewDept({
        name: '',
        head: '',
        rooms: ''
      });

      fetchDepartments();

    } catch (error) {
      console.error('Error adding department:', error);

      alert(
        error.message ||
        'Something went wrong while adding department.'
      );
    }
  };

  // --------------------------------------------------
  // DELETE DOCTOR
  // --------------------------------------------------

  const handleDeleteDoctor = async (id) => {
    if (
      !window.confirm(
        'Are you sure you want to remove this doctor?'
      )
    ) {
      return;
    }

    try {
      const response = await fetch(
        `${API_URL}/api/doctors/${id}`,
        {
          method: 'DELETE'
        }
      );

      const data = await response.json().catch(() => null);

      if (response.ok) {
        alert('Doctor removed successfully.');
        fetchDoctors();
      } else {
        alert(
          data?.detail ||
          'Failed to delete doctor'
        );
      }

    } catch (error) {
      console.error('Error deleting doctor:', error);

      alert(
        'Something went wrong while deleting doctor.'
      );
    }
  };

  // --------------------------------------------------
  // DELETE DEPARTMENT
  // --------------------------------------------------

  const handleDeleteDept = async (id) => {
    if (
      !window.confirm(
        'Are you sure you want to remove this department?'
      )
    ) {
      return;
    }

    try {
      const response = await fetch(
        `${API_URL}/api/departments/${id}`,
        {
          method: 'DELETE'
        }
      );

      const data = await response.json().catch(() => null);

      if (response.ok) {
        alert('Department removed successfully.');
        fetchDepartments();
      } else {
        alert(
          data?.detail ||
          'Failed to delete department'
        );
      }

    } catch (error) {
      console.error(
        'Error deleting department:',
        error
      );

      alert(
        'Something went wrong while deleting department.'
      );
    }
  };

  // --------------------------------------------------
  // UPDATE APPOINTMENT STATUS
  // --------------------------------------------------

  const handleStatusChange = async (
    id,
    newStatus
  ) => {
    try {
      const response = await fetch(
        `${API_URL}/api/appointments/${id}/status`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            status: newStatus
          })
        }
      );

      const data = await response.json().catch(() => null);

      if (response.ok) {
        fetchAppointments();
      } else {
        alert(
          data?.detail ||
          'Failed to update status'
        );
      }

    } catch (error) {
      console.error(
        'Error updating status:',
        error
      );

      alert(
        'Something went wrong while updating status.'
      );
    }
  };

  // --------------------------------------------------
  // LOGOUT
  // --------------------------------------------------

  const handleLogout = () => {
    localStorage.removeItem(
      'isAdminAuthenticated'
    );

    navigate('/admin');
  };

  // --------------------------------------------------
  // UI
  // --------------------------------------------------

  return (
    <div className="admin-dashboard-container">

      {/* ================= SIDEBAR ================= */}

      <aside className="sidebar">

        <h2>Mediyog Admin</h2>

        <nav>
          <ul>

            <li
              className={
                activeTab === 'appointments'
                  ? 'active'
                  : ''
              }
              onClick={() =>
                setActiveTab('appointments')
              }
            >
              Appointments
            </li>

            <li
              className={
                activeTab === 'doctors'
                  ? 'active'
                  : ''
              }
              onClick={() =>
                setActiveTab('doctors')
              }
            >
              Doctors
            </li>

            <li
              className={
                activeTab === 'departments'
                  ? 'active'
                  : ''
              }
              onClick={() =>
                setActiveTab('departments')
              }
            >
              Departments
            </li>

          </ul>
        </nav>

        <button
          className="logout-btn"
          onClick={handleLogout}
        >
          Log Out
        </button>

      </aside>

      {/* ================= MAIN CONTENT ================= */}

      <main className="dashboard-content">

        {/* =====================================================
            APPOINTMENTS
        ===================================================== */}

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
                    <th>Manage Action</th>
                  </tr>
                </thead>

                <tbody>

                  {appointments.length > 0 ? (

                    appointments.map((appt) => (

                      <tr key={appt.id}>

                        <td>
                          {
                            appt.patient_name ||
                            appt.patientName ||
                            appt.name ||
                            'N/A'
                          }
                        </td>

                        <td>
                          {
                            appt.age_gender ||
                            `${appt.age || ''} / ${
                              appt.gender || ''
                            }`
                          }
                        </td>

                        <td>
                          {appt.phone}
                        </td>

                        <td>
                          {
                            appt.department ||
                            appt.dept ||
                            'N/A'
                          }
                        </td>

                        <td>
                          {appt.date}
                        </td>

                        <td>

                          <span
                            className={`status ${
                              (
                                appt.status ||
                                'Pending'
                              ).toLowerCase()
                            }`}
                          >
                            {appt.status || 'Pending'}
                          </span>

                        </td>

                        <td>

                          <select
                            value={
                              appt.status ||
                              'Pending'
                            }
                            onChange={(e) =>
                              handleStatusChange(
                                appt.id,
                                e.target.value
                              )
                            }
                            style={{
                              padding: '6px 10px',
                              borderRadius: '6px',
                              border:
                                '1px solid #ccc',
                              cursor: 'pointer',
                              fontWeight: '500',
                              backgroundColor:
                                '#f9f9f9'
                            }}
                          >

                            <option value="Pending">
                              Pending
                            </option>

                            <option value="Confirmed">
                              Confirmed
                            </option>

                            <option value="Completed">
                              Completed
                            </option>

                          </select>

                        </td>

                      </tr>

                    ))

                  ) : (

                    <tr>

                      <td
                        colSpan="7"
                        style={{
                          textAlign: 'center'
                        }}
                      >
                        No appointments found.
                      </td>

                    </tr>

                  )}

                </tbody>

              </table>

            </div>

          </div>

        )}

        {/* =====================================================
            DOCTORS
        ===================================================== */}

        {activeTab === 'doctors' && (

          <div>

            <header className="content-header">
              <h1>Manage Doctors</h1>
            </header>

            {/* ================= ADD DOCTOR FORM ================= */}

            <form
              onSubmit={handleAddDoctor}
              className="admin-inline-form"
            >

              {/* DOCTOR NAME */}

              <input
                type="text"
                placeholder="Doctor Name"
                value={newDoc.name}
                onChange={(e) =>
                  setNewDoc({
                    ...newDoc,
                    name: e.target.value
                  })
                }
                required
              />

              {/* SPECIALTY */}

              <input
                type="text"
                placeholder="Specialty"
                value={newDoc.specialty}
                onChange={(e) =>
                  setNewDoc({
                    ...newDoc,
                    specialty: e.target.value
                  })
                }
                required
              />

              {/* EXPERIENCE */}

              <input
                type="text"
                placeholder="Experience"
                value={newDoc.experience}
                onChange={(e) =>
                  setNewDoc({
                    ...newDoc,
                    experience: e.target.value
                  })
                }
                required
              />

              {/* OPERATIONS */}

              <input
                type="text"
                placeholder="Operations"
                value={newDoc.operations}
                onChange={(e) =>
                  setNewDoc({
                    ...newDoc,
                    operations: e.target.value
                  })
                }
              />

              {/* PHONE */}

              <input
                type="text"
                placeholder="Phone"
                value={newDoc.phone}
                onChange={(e) =>
                  setNewDoc({
                    ...newDoc,
                    phone: e.target.value
                  })
                }
                required
              />

              {/* DOCTOR IMAGE */}

              <input
                id="doctor-image-input"
                type="file"
                accept="image/*"
                onChange={(e) =>
                  setNewDoc({
                    ...newDoc,
                    image:
                      e.target.files &&
                      e.target.files[0]
                        ? e.target.files[0]
                        : null
                  })
                }
              />

              {/* ADD DOCTOR BUTTON */}

              <button
                type="submit"
                className="add-btn"
                disabled={isAddingDoctor}
              >
                {isAddingDoctor
                  ? 'Adding Doctor...'
                  : '+ Add Doctor'}
              </button>

            </form>

            {/* ================= DOCTOR TABLE ================= */}

            <div className="table-container">

              <table>

                <thead>

                  <tr>

                    <th>Photo</th>
                    <th>Doctor Name</th>
                    <th>Specialty</th>
                    <th>Experience</th>
                    <th>Operations</th>
                    <th>Phone</th>
                    <th>Action</th>

                  </tr>

                </thead>

                <tbody>

                  {doctors.length > 0 ? (

                    doctors.map((doc) => (

                      <tr key={doc.id}>

                        {/* DOCTOR IMAGE */}

                        <td>

                          {doc.image ? (

                            <img
                              src={
                                doc.image.startsWith(
                                  'http'
                                )
                                  ? doc.image
                                  : `${API_URL}${doc.image}`
                              }
                              alt={
                                doc.doctor_name ||
                                doc.name ||
                                'Doctor'
                              }
                              style={{
                                width: '60px',
                                height: '60px',
                                objectFit: 'cover',
                                borderRadius: '8px'
                              }}
                              onError={(e) => {
                                e.currentTarget.style.display =
                                  'none';
                              }}
                            />

                          ) : (

                            <span>
                              No Image
                            </span>

                          )}

                        </td>

                        {/* DOCTOR NAME */}

                        <td>
                          {
                            doc.doctor_name ||
                            doc.name ||
                            'N/A'
                          }
                        </td>

                        {/* SPECIALTY */}

                        <td>
                          {doc.specialty}
                        </td>

                        {/* EXPERIENCE */}

                        <td>
                          {doc.experience}
                        </td>

                        {/* OPERATIONS */}

                        <td>
                          {
                            doc.operations ||
                            'Not specified'
                          }
                        </td>

                        {/* PHONE */}

                        <td>
                          {doc.phone}
                        </td>

                        {/* DELETE */}

                        <td>

                          <button
                            type="button"
                            className="delete-btn"
                            onClick={() =>
                              handleDeleteDoctor(
                                doc.id
                              )
                            }
                          >
                            Remove
                          </button>

                        </td>

                      </tr>

                    ))

                  ) : (

                    <tr>

                      <td
                        colSpan="7"
                        style={{
                          textAlign: 'center'
                        }}
                      >
                        No doctors added yet.
                      </td>

                    </tr>

                  )}

                </tbody>

              </table>

            </div>

          </div>

        )}

        {/* =====================================================
            DEPARTMENTS
        ===================================================== */}

        {activeTab === 'departments' && (

          <div>

            <header className="content-header">
              <h1>Manage Departments</h1>
            </header>

            {/* ================= ADD DEPARTMENT ================= */}

            <form
              onSubmit={handleAddDept}
              className="admin-inline-form"
            >

              <input
                type="text"
                placeholder="Department Name"
                value={newDept.name}
                onChange={(e) =>
                  setNewDept({
                    ...newDept,
                    name: e.target.value
                  })
                }
                required
              />

              <input
                type="text"
                placeholder="Department Head"
                value={newDept.head}
                onChange={(e) =>
                  setNewDept({
                    ...newDept,
                    head: e.target.value
                  })
                }
                required
              />

              <input
                type="text"
                placeholder="Room Numbers"
                value={newDept.rooms}
                onChange={(e) =>
                  setNewDept({
                    ...newDept,
                    rooms: e.target.value
                  })
                }
                required
              />

              <button
                type="submit"
                className="add-btn"
              >
                + Add Department
              </button>

            </form>

            {/* ================= DEPARTMENT TABLE ================= */}

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

                        <td>
                          {
                            dept.department_name ||
                            dept.departmentName ||
                            dept.name ||
                            'N/A'
                          }
                        </td>

                        <td>
                          {
                            dept.department_head ||
                            dept.departmentHead ||
                            dept.head ||
                            'N/A'
                          }
                        </td>

                        <td>
                          {
                            dept.room_numbers ||
                            dept.rooms ||
                            dept.roomNumbers ||
                            'N/A'
                          }
                        </td>

                        <td>

                          <button
                            type="button"
                            className="delete-btn"
                            onClick={() =>
                              handleDeleteDept(
                                dept.id
                              )
                            }
                          >
                            Remove
                          </button>

                        </td>

                      </tr>

                    ))

                  ) : (

                    <tr>

                      <td
                        colSpan="4"
                        style={{
                          textAlign: 'center'
                        }}
                      >
                        No departments added yet.
                      </td>

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
import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import './AppointmentModal.css';

const AppointmentModal = ({ isOpen, onClose }) => {
  const form = useRef();

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    // Sends the email using your specific EmailJS credentials
    emailjs.sendForm(
      'service_wsb5wzm', 
      'template_8qk6cuo', 
      form.current, 
      'MI042Pr1CBZZqEM8o'
    )
    .then((result) => {
        alert("Appointment requested! The hospital staff will call you shortly.");
        onClose();
    }, (error) => {
        alert("Something went wrong. Please try calling the hospital directly.");
        console.log(error.text);
    });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>&times;</button>
        
        <h2>Book an Appointment</h2>
        <p>Enter your details. Our team will call you to confirm your slot.</p>
        
        <form ref={form} onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <input type="text" name="patient_name" placeholder="Patient Full Name" required />
          </div>
          
          <div className="form-group" style={{ display: 'flex', gap: '10px' }}>
            <input type="number" name="age" placeholder="Age" min="1" max="120" required style={{ flex: 1 }} />
            <select name="gender" required defaultValue="" style={{ flex: 1 }}>
              <option value="" disabled>Gender...</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="form-group">
            <input type="tel" name="patient_phone" placeholder="Phone Number (e.g., 9876543210)" required pattern="[0-9]{10}" />
          </div>
          
          <div className="form-group">
            <input type="date" name="preferred_date" required title="Preferred Appointment Date" />
          </div>

          <div className="form-group">
            <select name="department" required defaultValue="">
              <option value="" disabled>Select Department...</option>
              <option value="Cardiology">Cardiology</option>
              <option value="Neurology">Neurology</option>
              <option value="Orthopedics">Orthopedics</option>
              <option value="General Checkup">General Checkup</option>
            </select>
          </div>
          <div className="form-group">
            <textarea name="symptoms" placeholder="Briefly describe your symptoms" rows="3" required></textarea>
          </div>
          
          <button type="submit" className="submit-appointment-btn">Submit Request</button>
        </form>
      </div>
    </div>
  );
};

export default AppointmentModal;
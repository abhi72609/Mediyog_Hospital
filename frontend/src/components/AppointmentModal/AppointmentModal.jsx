import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import './AppointmentModal.css';

const AppointmentModal = ({ isOpen, onClose, doctor }) => {
  const form = useRef();

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    emailjs.sendForm(
      'service_wsb5wzm',
      'template_8qk6cuo',
      form.current,
      'MI042Pr1CBZZqEM8o'
    )
      .then((result) => {
        alert(
          "Appointment requested! The hospital staff will call you shortly."
        );

        onClose();

      }, (error) => {

        alert(
          "Something went wrong. Please try calling the hospital directly."
        );

        console.log(error.text);
      });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>

      <div
        className="modal-content"
        onClick={(e) => e.stopPropagation()}
      >

        <button
          className="close-btn"
          onClick={onClose}
        >
          &times;
        </button>

        <h2>Book an Appointment</h2>

        {/* Selected Doctor */}
        {doctor && (
          <div className="selected-doctor">
            <p>
              Appointment with
            </p>

            <h3>{doctor.name}</h3>

            <span>{doctor.specialization}</span>
          </div>
        )}

        <p>
          Enter your details. Our team will call you to confirm your slot.
        </p>

        <form
          ref={form}
          onSubmit={handleSubmit}
          className="modal-form"
        >

          {/* Doctor information sent to EmailJS */}
          <input
            type="hidden"
            name="doctor_name"
            value={doctor?.name || ""}
          />

          <input
            type="hidden"
            name="doctor_specialization"
            value={doctor?.specialization || ""}
          />

          {/* Patient Name */}
          <div className="form-group">

            <input
              type="text"
              name="patient_name"
              placeholder="Patient Full Name"
              required
            />

          </div>


          {/* Age + Gender */}
          <div
            className="form-group"
            style={{
              display: 'flex',
              gap: '10px'
            }}
          >

            <input
              type="number"
              name="age"
              placeholder="Age"
              min="1"
              max="120"
              required
              style={{ flex: 1 }}
            />

            <select
              name="gender"
              required
              defaultValue=""
              style={{ flex: 1 }}
            >

              <option value="" disabled>
                Gender...
              </option>

              <option value="Male">
                Male
              </option>

              <option value="Female">
                Female
              </option>

              <option value="Other">
                Other
              </option>

            </select>

          </div>


          {/* Phone */}
          <div className="form-group">

            <input
              type="tel"
              name="patient_phone"
              placeholder="Phone Number (e.g., 9876543210)"
              required
              pattern="[0-9]{10}"
            />

          </div>


          {/* Date */}
          <div className="form-group">

            <input
              type="date"
              name="preferred_date"
              required
              title="Preferred Appointment Date"
            />

          </div>


          {/* Department */}
          <div className="form-group">

            <select
              name="department"
              required
              defaultValue=""
            >

              <option value="" disabled>
                Select Department...
              </option>

              <option value="General Surgery">
                General Surgery
              </option>

              <option value="Orthopedic Surgery">
                Orthopedic Surgery
              </option>

              <option value="Urological Surgery">
                Urological Surgery
              </option>

              <option value="Eye & Dental Surgery">
                Eye & Dental Surgery
              </option>

              <option value="Cosmetic Surgery">
                Cosmetic Surgery
              </option>

              <option value="Spinal Surgery">
                Spinal Surgery
              </option>

              <option value="Medicine">
                Medicine
              </option>

              <option value="Gynecology">
                Gynecology
              </option>

              <option value="Nephrology">
                Nephrology
              </option>

              <option value="General Medicine">
                General Medicine
              </option>

              <option value="Gastroenterology">
                Gastroenterology
              </option>

              <option value="Cardiology">
                Cardiology
              </option>

            </select>

          </div>


          {/* Symptoms */}
          <div className="form-group">

            <textarea
              name="symptoms"
              placeholder="Briefly describe your symptoms"
              rows="3"
              required
            ></textarea>

          </div>


          {/* Submit */}
          <button
            type="submit"
            className="submit-appointment-btn"
          >
            Submit Request
          </button>

        </form>

      </div>

    </div>
  );
};

export default AppointmentModal;
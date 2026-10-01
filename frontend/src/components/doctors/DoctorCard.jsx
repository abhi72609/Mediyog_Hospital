export default function DoctorCard({ doctor, onBookAppointment }) {
  return (
    <div className="doctor-card">

      <img
        src={doctor.image}
        alt={doctor.name}
      />

      <div className="doctor-info">

        <h3>{doctor.name}</h3>

        <p>{doctor.specialization}</p>

        <p>{doctor.experience}</p>

        <p>{doctor.operations}</p>

        <button
          className="book-doctor-btn"
          onClick={() => onBookAppointment(doctor)}
        >
          Book Appointment
        </button>

      </div>

    </div>
  );
}
function DoctorCard({ doctor }) {
  return (
    <div className="doctor-card">

      <div className="doctor-image-container">
        <img
          src={doctor.image}
          alt={doctor.name}
          className="doctor-image"
        />
      </div>

      <div className="doctor-info">

        <h3>{doctor.name}</h3>

        <p className="doctor-specialization">
          {doctor.specialization}
        </p>

        <p>{doctor.experience}</p>

        <p>{doctor.operations}</p>

        <button className="doctor-book-btn">
          Book Appointment
        </button>

      </div>

    </div>
  );
}

export default DoctorCard;
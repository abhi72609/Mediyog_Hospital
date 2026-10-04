export default function DoctorCard({
    doctor,
    onBookAppointment
}) {
    const cleanValue = (value, label) => {
        if (!value) {
            return "Not specified";
        }

        const text = String(value).trim();

        const regex = new RegExp(
            `^${label}\\s*[-:]\\s*`,
            "i"
        );

        return text.replace(regex, "").trim();
    };

    const specialty = cleanValue(
        doctor.specialization,
        "specialty"
    );

    const experience = cleanValue(
        doctor.experience,
        "experience"
    );

    const operations = cleanValue(
        doctor.operations,
        "operations"
    );

    return (
        <div className="doctor-card">

            <img
                src={doctor.image}
                alt={doctor.name}
            />

            <div className="doctor-info">

                <h3>
                    {doctor.name}
                </h3>

                <p>
                    Specialty - {specialty}
                </p>

                <p>
                    Experience - {experience}
                </p>

                <p>
                    Operations - {operations}
                </p>

                <button
                    className="book-doctor-btn"
                    onClick={() =>
                        onBookAppointment(doctor)
                    }
                >
                    Book Appointment
                </button>

            </div>

        </div>
    );
}
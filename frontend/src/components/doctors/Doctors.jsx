import { useEffect, useState } from "react";
import DoctorCard from "./DoctorCard.jsx";
import "./Doctor.css";
import defaultDoctorImage from "../../assets/Dr Sandeep Kumar.png";

const API_URL = "http://127.0.0.1:8000";
const DOCTORS_CACHE_KEY = "mediyog_doctors";

function Doctors({ onBookAppointment }) {
    const [doctors, setDoctors] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    const visibleDoctors = 4;

    useEffect(() => {
        fetch(`${API_URL}/api/doctors`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to fetch doctors");
                }

                return response.json();
            })
            .then((data) => {
                const formattedDoctors = data.map((doctor) => ({
                    id: doctor.id,
                    name: doctor.doctor_name,
                    specialization: doctor.specialty,
                    experience: doctor.experience,
                    operations: doctor.operations,
                    image: doctor.image
                        ? `${API_URL}${doctor.image}`
                        : defaultDoctorImage,
                }));

                // Display doctors
                setDoctors(formattedDoctors);

                // Save the latest successful doctor list
                localStorage.setItem(
                    DOCTORS_CACHE_KEY,
                    JSON.stringify(formattedDoctors)
                );
            })
            .catch((error) => {
                console.error(
                    "Backend unavailable. Loading saved doctors...",
                    error
                );

                // Try loading previously saved doctors
                const savedDoctors = localStorage.getItem(
                    DOCTORS_CACHE_KEY
                );

                if (savedDoctors) {
                    try {
                        const parsedDoctors = JSON.parse(savedDoctors);

                        setDoctors(parsedDoctors);

                        console.log(
                            "Doctors loaded from browser cache."
                        );
                    } catch (cacheError) {
                        console.error(
                            "Could not read saved doctors:",
                            cacheError
                        );
                    }
                }
            });
    }, []);

    const nextDoctors = () => {
        setCurrentIndex((prevIndex) => {
            if (doctors.length <= visibleDoctors) {
                return 0;
            }

            if (
                prevIndex + visibleDoctors >=
                doctors.length
            ) {
                return 0;
            }

            return prevIndex + 1;
        });
    };

    const previousDoctors = () => {
        setCurrentIndex((prevIndex) => {
            if (doctors.length <= visibleDoctors) {
                return 0;
            }

            if (prevIndex === 0) {
                return Math.max(
                    0,
                    doctors.length - visibleDoctors
                );
            }

            return prevIndex - 1;
        });
    };

    const displayedDoctors = doctors.slice(
        currentIndex,
        currentIndex + visibleDoctors
    );

    return (
        <section
            className="doctors-section"
            id="doctors"
        >
            <div className="doctors-header">

                <p className="section-subtitle">
                    OUR SPECIALISTS
                </p>

                <h2>
                    Meet Our Doctors
                </h2>

                <p className="section-description">
                    Our experienced medical professionals
                    are dedicated to providing the best
                    possible care to every patient.
                </p>

            </div>

            <div className="doctors-carousel">

                {doctors.length > visibleDoctors && (
                    <button
                        className="carousel-btn previous-btn"
                        onClick={previousDoctors}
                        aria-label="Previous doctors"
                    >
                        &#10094;
                    </button>
                )}

                <div className="doctors-container">

                    {displayedDoctors.length > 0 ? (
                        displayedDoctors.map((doctor) => (
                            <DoctorCard
                                key={doctor.id}
                                doctor={doctor}
                                onBookAppointment={
                                    onBookAppointment
                                }
                            />
                        ))
                    ) : (
                        <div className="no-doctors-message">
                            <p>
                                No doctors available at
                                the moment.
                            </p>
                        </div>
                    )}

                </div>

                {doctors.length > visibleDoctors && (
                    <button
                        className="carousel-btn next-btn"
                        onClick={nextDoctors}
                        aria-label="Next doctors"
                    >
                        &#10095;
                    </button>
                )}

            </div>
        </section>
    );
}

export default Doctors;
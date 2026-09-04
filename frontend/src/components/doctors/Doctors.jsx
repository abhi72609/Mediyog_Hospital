import { useState } from "react";
import doctors from "./DoctorData";
import DoctorCard from "./DoctorCard";
import "./Doctors.css";

function Doctors() {

  const [currentIndex, setCurrentIndex] = useState(0);

  const visibleDoctors = 4;

  const nextDoctors = () => {
    setCurrentIndex((prevIndex) => {

      if (prevIndex + visibleDoctors >= doctors.length) {
        return 0;
      }

      return prevIndex + 1;
    });
  };

  const previousDoctors = () => {
    setCurrentIndex((prevIndex) => {

      if (prevIndex === 0) {
        return doctors.length - visibleDoctors;
      }

      return prevIndex - 1;
    });
  };

  const displayedDoctors = doctors.slice(
    currentIndex,
    currentIndex + visibleDoctors
  );

  return (
    <section className="doctors-section">

      <div className="doctors-header">

        <div>
          <p className="section-subtitle">
            OUR SPECIALISTS
          </p>

          <h2>
            Meet Our Doctors
          </h2>

          <p className="section-description">
            Our experienced medical professionals are dedicated
            to providing the best possible care to every patient.
          </p>
        </div>

      </div>


      <div className="doctors-carousel">

        {/* Previous Button */}

        <button
          className="carousel-btn previous-btn"
          onClick={previousDoctors}
          aria-label="Previous doctors"
        >
          &#10094;
        </button>


        {/* Doctor Cards */}

        <div className="doctors-container">

          {displayedDoctors.map((doctor) => (
            <DoctorCard
              key={doctor.id}
              doctor={doctor}
            />
          ))}

        </div>


        {/* Next Button */}

        <button
          className="carousel-btn next-btn"
          onClick={nextDoctors}
          aria-label="Next doctors"
        >
          &#10095;
        </button>

      </div>

    </section>
  );
}

export default Doctors;
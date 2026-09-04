import React from 'react';
import './About.css';
import hospitalImage from '../../assets/Hospital.png'; // Ensure this matches your file name

const About = () => {
  return (
    <section className="about-section">
      <div className="about-container">
        
        <div className="about-content-wrapper">
          <div className="about-text">
            <h2>About Mediyog Hospital</h2>
            <p>
              Established as a premier healthcare institution, Mediyog Hospital & Trauma Centre is dedicated to delivering world-class medical services to the community. With  clinical excellence, our facility combines advanced medical technology with compassionate patient care.
            </p>
            <p>
              Whether it is a routine check-up or a critical trauma situation, our 24/7 emergency readiness ensures that expert medical intervention is always available when you need it most.
            </p>
          </div>

          <div className="mission-vision-grid">
            <div className="info-card">
              <h3>Our Mission</h3>
              <p>To provide accessible, patient-centric, and high-quality healthcare services through continuous innovation, advanced technology, and a dedicated medical team.</p>
            </div>
            <div className="info-card">
              <h3>Our Vision</h3>
              <p>To be the most trusted and advanced regional healthcare destination, recognized for clinical excellence, ethical practices, and profound compassion.</p>
            </div>
          </div>

          <div className="core-values">
            <h3>Our Core Values</h3>
            <ul className="about-highlights">
              <li><strong>✓ Patient First:</strong> Compassionate care tailored to individual needs.</li>
              <li><strong>✓ Excellence:</strong> Maintaining the highest clinical and safety standards.</li>
              <li><strong>✓ Integrity:</strong> Absolute transparency and ethics in all medical practices.</li>
              <li><strong>✓ 24/7 Readiness:</strong> Unwavering commitment to rapid emergency response.</li>
            </ul>
          </div>
        </div>
        
        <div className="about-image-wrapper">
          <img src={hospitalImage} alt="Mediyog Hospital Front" className="about-image" />
        </div>

      </div>
    </section>
  );
};

export default About;
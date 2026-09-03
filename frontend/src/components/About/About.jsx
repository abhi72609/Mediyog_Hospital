import React from 'react';
import './About.css';

const About = () => {
  return (
    <section className="about-section">
      <div className="about-container">
        <div className="about-text">
          <h2>About Mediyog Hospital</h2>
          <p>
            Welcome to Mediyog Hospital, where we are more than just a healthcare facility. 
            We are committed to providing seamless, compassionate, and advanced medical care 
            to our community 24/7.
          </p>
          <p>
            With over 16 years of experience, our team of dedicated specialists utilizes 
            state-of-the-art technology to ensure patient safety, accurate diagnoses, and faster recovery.
          </p>
          <ul className="about-highlights">
            <li>✓  Expert Doctors</li>
            <li>✓ 20+ Specialized Departments</li>
            <li>✓ 24/7 Emergency & Trauma Care</li>
            <li>✓ 200k+ Happy Patients</li>
          </ul>
        </div>
        
        <div className="about-image-wrapper">
          {/* You can replace this div with an actual <img src={hospitalImage} /> tag later */}
          <div className="image-placeholder">
            <span>Hospital Image Placeholder</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
import React from 'react';
import './Footer.css';
import { FaFacebookF, FaTwitter, FaYoutube, FaLinkedinIn } from 'react-icons/fa'; // Ensure react-icons is installed

const Footer = () => {
  return (
    <footer className="custom-footer">
      <div className="footer-main">
        
        {/* Column 1: Address & Contact */}
        <div className="footer-col info-col">
          <h3>Mediyog Hospital</h3>
          <p>North of Navada Gate ,Near Mohan High School ,</p>
          <p>  Daniawan,</p>
          <p>Patna -  801304 (Bihar).</p>
          <br />
          <p><strong>Phone:</strong> 9523422523, 8789380087</p>
          <p><strong>Email:</strong> info@mediyog.org</p>
        </div>

      {/* Column 2: Important Links */}
        <div className="footer-col links-col">
          <h3>Important Links</h3>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="#about">About Us</a></li>
            <li><a href="#departments">Departments</a></li>
            <li><a href="#doctors">Doctors</a></li>
            <li><a href="#contact">Contact Us</a></li>
            <li><a href="#appointment">Book Appointment</a></li>
          </ul>
        </div>
       
        {/* Column 3: Social Media */}
        <div className="footer-col social-col">
          <h3>Social Media</h3>
          <p>Follow us on our social platforms for the latest updates and health tips.</p>
          <div className="social-icons">
            <a href="#facebook"><FaFacebookF /></a>
            <a href="#twitter"><FaTwitter /></a>
            <a href="#youtube"><FaYoutube /></a>
            <a href="#linkedin"><FaLinkedinIn /></a>
          </div>
        </div>

      </div>

      {/* Green Bottom Copyright Bar */}
      <div className="footer-bottom">
        <p>© Mediyog Hospital All Rights Reserved by Mediyog Hospital | Created & Managed by YourTeam</p>
      </div>
    </footer>
  );
};

export default Footer;
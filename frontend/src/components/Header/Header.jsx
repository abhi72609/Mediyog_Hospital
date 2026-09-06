import React, { useState } from 'react';
import "./Header.css";
import { Link } from 'react-router-dom';
import AppointmentModal from '../AppointmentModal/AppointmentModal';

function Header() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return(
        <>
            <header className="header">
                <div className="header-container">
                    <div className="logo">
                        <span className="logo-icon">+</span>   
                        <div>
                            <h2>Mediyog</h2>
                            <h2>Hospital</h2>
                        </div>
                    </div>

                    {/* Navigation using section anchors for the Home page */}
                    <nav className='navigation'>
                        <a href="/">Home</a>
                        <a href="#departments">Departments</a>
                        <a href="#doctors">Doctors</a>
                        <a href="#services">Services</a>
                        <a href="#about">About</a>
                        <a href="#contact">Contact</a>

                        {/* Admin Login remains a separate route */}
                        <Link to="/admin" className="admin-link" style={{ fontWeight: 'bold', color: '#1e3a8a' }}>
                           Admin Login
                        </Link>
                    </nav>

                    <button className="appointment-btn" onClick={() => setIsModalOpen(true)}>
                        Book Appointment
                    </button>
                </div>
            </header>

            <AppointmentModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </>
    )
}

export default Header;
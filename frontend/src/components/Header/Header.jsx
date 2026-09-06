import React, { useState } from 'react';
import "./Header.css";
import { Link } from 'react-router-dom';
import AppointmentModal from '../AppointmentModal/AppointmentModal';

function Header() {
    // State to control if the modal is visible or hidden
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <header className="header">
                <div className="header-container">

                    {/* Logo */}
                    <div className="logo">
                        <span className="logo-icon">+</span>
                        <div>
                            <h2>Mediyog</h2>
                            <h2>Hospital</h2>
                        </div>
                    </div>

                    {/* Navigation */}
                    <nav className='navigation'>
                        <Link to="/">Home</Link>
                        <Link to="/doctors">Doctors</Link>
                        <Link to="/departments">Departments</Link>
                        <Link to="/services">Services</Link>
                        <Link to="/about">About</Link>
                        <Link to="/contact">Contact</Link>

                        {/* Added Admin Login Link */}
                        <Link to="/admin" className="admin-link" style={{ fontWeight: 'bold', color: '#1e3a8a' }}>
                            Admin Login
                        </Link>
                    </nav>

                    {/* Appointment Button triggering the modal */}
                    <button className="appointment-btn" onClick={() => setIsModalOpen(true)}>
                        Book Appointment
                    </button>

                </div>
            </header>

            {/* The Modal Component */}
            <AppointmentModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
        </>
    )
}

export default Header;
import React, { useState } from "react";
import "./Header.css";
import { Link } from "react-router-dom";
import AppointmentModal from "../AppointmentModal/AppointmentModal";

function Header() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    const toggleLanguage = () => {
        const currentCookie = document.cookie;
        if (currentCookie.includes("/en/hi")) {
            document.cookie = "googtrans=/en/en; path=/";
        } else {
            document.cookie = "googtrans=/en/hi; path=/";
        }
        window.location.reload();
    };

    return (
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

                    <button
                        className="menu-button"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? "×" : "?"}
                    </button>

                    <nav className={`navigation ${isMenuOpen ? "navigation-open" : ""}`}>
                        <a href="/" onClick={closeMenu}>Home</a>
                        <a href="/#doctors" onClick={closeMenu}>Doctors</a>
                        <a href="/#departments" onClick={closeMenu}>Departments</a>
                        <a href="/#services" onClick={closeMenu}>Services</a>
                        <a href="/#about" onClick={closeMenu}>About</a>
                        <a href="/#contact" onClick={closeMenu}>Contact</a>

                        <Link to="/admin" className="admin-link" onClick={closeMenu}>
                            Admin Login
                        </Link>

                        <button
                            className="mobile-appointment-btn"
                            onClick={() => {
                                setIsModalOpen(true);
                                closeMenu();
                            }}
                        >
                            Book Appointment
                        </button>
                    </nav>

                    <button className="lang-toggle-btn" onClick={toggleLanguage}>
                        ?? ?????? / English
                    </button>

                    <button
                        className="appointment-btn"
                        onClick={() => setIsModalOpen(true)}
                    >
                        Book Appointment
                    </button>
                </div>
            </header>

            <AppointmentModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </>
    );
}

export default Header;
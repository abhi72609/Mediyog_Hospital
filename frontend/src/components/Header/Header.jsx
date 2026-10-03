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

                    {/* ================= LOGO ================= */}

                    <Link to="/" className="logo">

                        <div className="logo-badge">
                            <div className="logo-cross">
                                <div className="logo-cross-v"></div>
                                <div className="logo-cross-h"></div>
                            </div>
                        </div>

                        <div className="logo-text">
                            <span className="logo-title">
                                MEDIYOG
                            </span>

                            <span className="logo-subtitle">
                                HOSPITAL
                            </span>
                        </div>

                    </Link>

                    {/* ================= MOBILE MENU ================= */}

                    <button
                        type="button"
                        className="menu-button"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        aria-label="Toggle navigation menu"
                    >
                        {isMenuOpen ? "✕" : "☰"}
                    </button>

                    {/* ================= NAVIGATION ================= */}

                    <nav
                        className={`navigation ${
                            isMenuOpen ? "navigation-open" : ""
                        }`}
                    >

                        <a href="/" onClick={closeMenu}>
                            Home
                        </a>

                        <a href="/#doctors" onClick={closeMenu}>
                            Doctors
                        </a>

                        <a href="/#departments" onClick={closeMenu}>
                            Departments
                        </a>

                        <a href="/#services" onClick={closeMenu}>
                            Services
                        </a>

                        <a href="/#about" onClick={closeMenu}>
                            About
                        </a>

                        <Link
                            to="/admin"
                            className="admin-link"
                            onClick={closeMenu}
                        >
                            Admin Login
                        </Link>

                        {/* Mobile Appointment */}

                        <button
                            type="button"
                            className="mobile-appointment-btn"
                            onClick={() => {
                                setIsModalOpen(true);
                                closeMenu();
                            }}
                        >
                            Book Appointment
                        </button>

                    </nav>

                    {/* ================= LANGUAGE ================= */}

                    <button
                        type="button"
                        className="lang-toggle-btn"
                        onClick={toggleLanguage}
                    >
                        🌐 हिन्दी / English
                    </button>

                    {/* ================= APPOINTMENT ================= */}

                    <button
                        type="button"
                        className="appointment-btn"
                        onClick={() => setIsModalOpen(true)}
                    >
                        Book Appointment
                    </button>

                </div>
            </header>

            {/* ================= APPOINTMENT MODAL ================= */}

            <AppointmentModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </>
    );
}

export default Header;
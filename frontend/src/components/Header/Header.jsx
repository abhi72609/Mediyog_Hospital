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
                    {/* Updated Logo - Concept 2 */}
                    <Link to="/" className="flex items-center space-x-3 cursor-pointer no-underline" style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none' }}>
                        <div style={{
                            width: '40px',
                            height: '40px',
                            backgroundColor: '#0284C7',
                            borderRadius: '50%',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                            flexShrink: 0
                        }}>
                            <div style={{ position: 'relative', width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <div style={{ position: 'absolute', width: '6px', height: '20px', backgroundColor: '#FFFFFF', borderRadius: '4px' }}></div>
                                <div style={{ position: 'absolute', width: '20px', height: '6px', backgroundColor: '#FFFFFF', borderRadius: '4px' }}></div>
                            </div>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <span style={{ fontSize: '1.125rem', fontWeight: '800', color: '#0284C7', letterSpacing: '-0.025em', lineHeight: '1' }}>MEDIYOG</span>
                            <span style={{ fontSize: '0.75rem', fontWeight: '700', color: '#0F172A', letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: '3px' }}>HOSPITAL</span>
                        </div>
                    </Link>

                    <button
                        className="menu-button"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? "✕" : "☰"}
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
                        🌐 हिन्दी / English
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
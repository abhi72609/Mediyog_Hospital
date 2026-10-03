import React from "react";
import "./Footer.css";
import {
    FaFacebookF,
    FaTwitter,
    FaYoutube,
    FaLinkedinIn,
} from "react-icons/fa";

const Footer = ({ onBookAppointment }) => {
    return (
        <footer className="custom-footer">

            <div className="footer-main">

                {/* ===============================
                    COLUMN 1: ADDRESS & CONTACT
                =============================== */}

                <div className="footer-col info-col">

                    <h3>Mediyog Hospital</h3>

                    <p>
                        North of Navada Gate ,Near Mohan High School ,
                    </p>

                    <p>
                        Daniawan,
                    </p>

                    <p>
                        Patna - 801304 (Bihar).
                    </p>

                    <br />

                    <p>
                        <strong>Phone:</strong>{" "}
                        9523422523, 8789380087
                    </p>

                    <p>
                        <strong>Email:</strong>{" "}
                        info@mediyog.org
                    </p>

                </div>


                {/* ===============================
                    COLUMN 2: IMPORTANT LINKS
                =============================== */}

                <div className="footer-col links-col">

                    <h3>Important Links</h3>

                    <ul>

                        <li>
                            <a href="/">
                                Home
                            </a>
                        </li>

                        <li>
                            <a href="/#about">
                                About Us
                            </a>
                        </li>

                        <li>
                            <a href="/#doctors">
                                Doctors
                            </a>
                        </li>

                        <li>
                            <a href="/#departments">
                                Departments
                            </a>
                        </li>

                        <li>
                            <a href="/#services">
                                Services
                            </a>
                        </li>

                        {/* BOOK APPOINTMENT */}

                        <li>
                            <button
                                type="button"
                                className="footer-book-appointment"
                                onClick={onBookAppointment}
                            >
                                Book Appointment
                            </button>
                        </li>

                    </ul>

                </div>


                {/* ===============================
                    COLUMN 3: SOCIAL MEDIA
                =============================== */}

                <div className="footer-col social-col">

                    <h3>Social Media</h3>

                    <p>
                        Follow us on our social platforms
                        for the latest updates and health tips.
                    </p>

                    <div className="social-icons">

                        <a
                            href="#facebook"
                            aria-label="Facebook"
                        >
                            <FaFacebookF />
                        </a>

                        <a
                            href="#twitter"
                            aria-label="Twitter"
                        >
                            <FaTwitter />
                        </a>

                        <a
                            href="#youtube"
                            aria-label="YouTube"
                        >
                            <FaYoutube />
                        </a>

                        <a
                            href="#linkedin"
                            aria-label="LinkedIn"
                        >
                            <FaLinkedinIn />
                        </a>

                    </div>

                </div>

            </div>


            {/* ===============================
                FOOTER BOTTOM
            =============================== */}

            <div className="footer-bottom">

                <p>
                    © Mediyog Hospital All Rights Reserved by
                    Mediyog Hospital | Created &amp; Managed by YourTeam
                </p>

            </div>

        </footer>
    );
};

export default Footer;
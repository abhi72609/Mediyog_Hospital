import { useEffect, useState } from "react";
import Doctors from "../doctors/Doctors.jsx";
import Department from "../departments/Departments.jsx";
import Services from "../services/Services.jsx";
import About from "../About/About.jsx";
import "./Home.css";

import Poster from "../../assets/poster.png";
import OT from "../../assets/ot.png";
import Reception from "../../assets/reception.png";
import Hospital from "../../assets/hospital.png";

export default function Home() {
    const images = [Poster, OT, Reception, Hospital];

    // Add first image again at the end for the infinite loop effect
    const sliderImages = [...images, images[0]];

    const [currentIndex, setCurrentIndex] = useState(0);
    const [transition, setTransition] = useState(true);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prevIndex) => prevIndex + 1);
        }, 4000);

        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        // When we reach the duplicate first image
        if (currentIndex === images.length) {
            const timer = setTimeout(() => {
                // Remove transition
                setTransition(false);
                // Instantly go back to real first image
                setCurrentIndex(0);
            }, 800);

            return () => clearTimeout(timer);
        }

        // Turn transition back on
        if (!transition) {
            const timer = setTimeout(() => {
                setTransition(true);
            }, 50);

            return () => clearTimeout(timer);
        }
    }, [currentIndex, images.length, transition]);

    return (
        <div className="home-container">
            <section id="home" className="hero-section">
                <div className="image-slider">
                    <div
                        className="slider-track"
                        style={{
                            transform: `translateX(-${currentIndex * 100}%)`,
                            transition: transition
                                ? "transform 0.8s ease-in-out"
                                : "none"
                        }}
                    >
                        {sliderImages.map((image, index) => (
                            <div
                                className="image-slide"
                                key={index}
                            >
                                <img
                                    src={image}
                                    alt={`Hospital Slide ${index + 1}`}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

       
            <section id="doctors">
                <Doctors />
            </section>

                 <section id="departments">
                <Department />
            </section>


            <section id="services">
                <Services />
            </section>

            <section id="about">
                <About />
            </section>
        </div>
    );
}
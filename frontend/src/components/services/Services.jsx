import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./Services.css";

const servicesList = [
  { id: 1, title: "24/7 Emergency Care", description: "Immediate medical attention and critical care services available round-the-clock.", details: "Equipped with advanced life support ambulances, trauma care units, and experienced emergency physicians ready to handle critical incidents at any moment." },
  { id: 2, title: "Advanced Diagnostics", description: "State-of-the-art laboratory testing, MRI, CT scans, and digital X-rays.", details: "High-precision diagnostic imaging and pathology labs providing rapid, accurate reports to assist physicians in targeted treatments." },
  { id: 3, title: "Outpatient Consultation", description: "Expert consultations across diverse specialties with leading practitioners.", details: "Book scheduled appointments with specialist doctors across cardiology, neurology, orthopedics, general medicine, and more." },
  { id: 4, title: "Inpatient Care & Wards", description: "Comfortable private rooms, semi-private wards, and intensive care units.", details: "Dedicated nursing care, personalized nutrition plans, and continuous vital monitoring in a clean, healing environment." },
  { id: 5, title: "Pharmacy Services", description: "Round-the-clock hospital pharmacy stocked with genuine prescription medicines.",details: "Fully integrated dispensary ensuring patients have immediate access to required medications right after consultation or discharge." },
  { id: 6, title: "Health Checkup Packages", description: "Comprehensive wellness screening packages customized for all age groups.", details: "Preventive health checkups including cardiac profiles, diabetic screenings, full-body scans, and geriatric health evaluations." }
];

export default function Services() {
  const [hoveredId, setHoveredId] = useState(null);

  return (
    <div className="services-container">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Our Medical Services
      </motion.h2>

      <div className="services-grid">
        {servicesList.map((service, index) => {
          const isHovered = hoveredId === service.id;

          return (
            <motion.div
              key={service.id}
              className={`service-card ${isHovered ? "expanded" : ""}`}
              onMouseEnter={() => setHoveredId(service.id)}
              onMouseLeave={() => setHoveredId(null)}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              whileHover={{ scale: 1.05, zIndex: 10 }}
              layout
            >
              <h3>{service.title}</h3>
              <p>{service.description}</p>

              <AnimatePresence>
                {isHovered && (
                  <motion.div
                    className="extra-details"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <hr className="detail-divider" />
                    <p className="detailed-text">{service.details}</p>
                   
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
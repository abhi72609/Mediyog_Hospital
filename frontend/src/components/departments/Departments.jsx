import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./Departments.css";

const departmentsList = [
  { id: 1, name: "General Surgery", details: "Specializes in abdominal contents including esophagus, stomach, small intestine, colon, liver, pancreas, gallbladder, and appendix." },
  { id: 2, name: "Orthopedic Surgery", details: "Focuses on injuries and diseases of the body's musculoskeletal system, including bones, joints, ligaments, tendons, and muscles." },
  { id: 3, name: "Urological Surgery", details: "Treats disorders of the urinary-tract organs and the male reproductive system with advanced minimally invasive techniques." },
  { id: 4, name: "Eye & Dental Surgery", details: "Comprehensive care for vision correction, corneal procedures, and complex oral, jaw, and dental surgical treatments." },
  { id: 5, name: "Cosmetic Surgery", details: "Dedicated to the reconstruction of facial and body defects due to birth disorders, trauma, burns, and disease to improve appearance." },
  { id: 6, name: "Spinal Surgery", details: "Expert surgical interventions for complex spinal deformities, disc herniation, spinal stenosis, and trauma injuries." },
  { id: 7, name: "Medicine", details: "Comprehensive internal medicine care focusing on the prevention, diagnosis, and medical treatment of adult diseases." },
  { id: 8, name: "Gynecology", details: "Comprehensive healthcare focusing on women's reproductive health, prenatal care, and specialized surgical treatments." },
  { id: 9, name: "Nephrology", details: "Focuses on kidney care, fluid and electrolyte imbalances, hypertension management, and dialysis support." },
  { id: 10, name: "General Medicine", details: "Primary health consultations, routine medical check-ups, and long-term chronic illness management." },
  { id: 11, name: "Gastroenterology", details: "Specializes in diagnosing and treating disorders of the digestive system, liver, and gastrointestinal tract." },
  { id: 12, name: "Cardiology", details: "Advanced diagnosis and management of heart and blood vessel conditions, including interventional cardiology." }
];

export default function Department() {
  const [hoveredId, setHoveredId] = useState(null);

  return (
    <div className="departments-container">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Our Medical Departments
      </motion.h2>

      <div className="departments-grid">
        {departmentsList.map((dept, index) => {
          const isHovered = hoveredId === dept.id;

          return (
            <motion.div
              key={dept.id}
              className={`department-card ${isHovered ? "expanded" : ""}`}
              onMouseEnter={() => setHoveredId(dept.id)}
              onMouseLeave={() => setHoveredId(null)}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.03 }}
              whileHover={{ scale: 1.05, zIndex: 10 }}
              layout
            >
              <h3>{dept.name}</h3>
              <p>Advanced diagnostic, surgical, and therapeutic care tailored for patients.</p>

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
                    <p className="detailed-text">{dept.details}</p>
                   
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
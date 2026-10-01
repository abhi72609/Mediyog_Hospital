// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// import Header from "./components/Header/Header.jsx";
// import Home from "./components/home/Home.jsx";
// import About from "./components/About/About.jsx";
// import Doctors from "./components/doctors/Doctors.jsx";
// import Departments from "./components/departments/Departments.jsx";
// import Services from "./components/services/Services.jsx";
// import Footer from "./components/footer/footer.jsx";

// import AdminLogin from "./components/Admin/AdminLogin.jsx";
// import AdminDashboard from "./components/Admin/AdminDashboard.jsx";

// import "./App.css";

// function App() {
//     return (
//         <Router>
//             <div className="app-wrapper">
//                 <Header />

//                 <main className="main-content">
//                     <Routes>
//                         <Route path="/" element={<Home />} />

//                         <Route path="/doctors" element={<Doctors />} />
//                         <Route path="/departments" element={<Departments />} />
//                         <Route path="/services" element={<Services />} />
//                         <Route path="/about" element={<About />} />

//                         <Route path="/admin" element={<AdminLogin />} />
//                         <Route
//                             path="/admin/dashboard"
//                             element={<AdminDashboard />}
//                         />
//                     </Routes>
//                 </main>

//                 <Footer />
//             </div>
//         </Router>
//     );
// }

// export default App;
import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/Header/Header.jsx";
import Home from "./components/home/Home.jsx";
import About from "./components/About/About.jsx";
import Doctors from "./components/doctors/Doctors.jsx";
import Departments from "./components/departments/Departments.jsx";
import Services from "./components/services/Services.jsx";
import Footer from "./components/footer/footer.jsx";

import AdminLogin from "./components/Admin/AdminLogin.jsx";
import AdminDashboard from "./components/Admin/AdminDashboard.jsx";

import AppointmentModal from "./components/AppointmentModal/AppointmentModal.jsx";

import "./App.css";

function App() {

    const [isAppointmentOpen, setIsAppointmentOpen] = useState(false);
    const [selectedDoctor, setSelectedDoctor] = useState(null);

    // When patient clicks Book Appointment on a doctor
    const handleBookAppointment = (doctor) => {
        setSelectedDoctor(doctor);
        setIsAppointmentOpen(true);
    };

    // Close appointment modal
    const handleCloseAppointment = () => {
        setIsAppointmentOpen(false);
        setSelectedDoctor(null);
    };

    return (
        <Router>

            <div className="app-wrapper">

                <Header />

                <main className="main-content">

                    <Routes>

                        <Route path="/" element={<Home
                            onBookAppointment={handleBookAppointment}
                        />} />

                        <Route
                            path="/doctors"
                            element={
                                <Doctors
                                    onBookAppointment={handleBookAppointment}
                                />
                            }
                        />

                        <Route
                            path="/departments"
                            element={<Departments />}
                        />

                        <Route
                            path="/services"
                            element={<Services />}
                        />

                        <Route
                            path="/about"
                            element={<About />}
                        />

                        <Route
                            path="/admin"
                            element={<AdminLogin />}
                        />

                        <Route
                            path="/admin/dashboard"
                            element={<AdminDashboard />}
                        />

                    </Routes>

                </main>

                <Footer />

                {/* Appointment Modal */}
                <AppointmentModal
                    isOpen={isAppointmentOpen}
                    onClose={handleCloseAppointment}
                    doctor={selectedDoctor}
                />

            </div>

        </Router>
    );
}

export default App;
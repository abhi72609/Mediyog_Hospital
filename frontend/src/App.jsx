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

import "./App.css";

function App() {
    return (
        <Router>
            <div className="app-wrapper">
                <Header />

                <main className="main-content">
                    <Routes>
                        <Route path="/" element={<Home />} />

                        <Route path="/doctors" element={<Doctors />} />
                        <Route path="/departments" element={<Departments />} />
                        <Route path="/services" element={<Services />} />
                        <Route path="/about" element={<About />} />

                        <Route path="/admin" element={<AdminLogin />} />
                        <Route
                            path="/admin/dashboard"
                            element={<AdminDashboard />}
                        />
                    </Routes>
                </main>

                <Footer />
            </div>
        </Router>
    );
}

export default App;
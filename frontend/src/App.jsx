import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/Header/Header.jsx";
import Home from "./components/Home/Home.jsx";
import Doctors from "./components/doctors/Doctors.jsx";
import About from "./components/About/About.jsx";
import Footer from "./components/footer/footer.jsx";

// Admin components
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

            {/* Homepage */}
            <Route
              path="/"
              element={
                <>
                  <Home />
                  <Doctors />
                </>
              }
            />

            {/* Separate pages */}
            <Route path="/doctors" element={<Doctors />} />
            <Route path="/about" element={<About />} />

            {/* Admin */}
            <Route path="/admin" element={<AdminLogin />} />
            <Route path="/admin/dashboard" element={<AdminDashboard />}/>

          </Routes>

        </main>

        <Footer />

      </div>
    </Router>
  );
}

export default App;
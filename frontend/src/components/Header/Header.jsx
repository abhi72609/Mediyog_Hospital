import "./Header.css";

function Header() {
    return(
        <header className="header">
            <div className="header-container">

                {/* Logo */}
                <div className="logo">
                    <span className="logo-icon">+</span>    

                    <div>
                        <h2>Mediyog</h2>
                        <h3>Hospital</h3>
                    </div>
                </div>

                {/* Navigation */}
                <nav className='navigation'>
                    <a href="/">Home</a>
                    <a href="/about">About</a>
                    <a href="/departments">Departments</a>
                    <a href="/doctors">Doctors</a>
                    <a href="/services">Services</a>
                    <a href="/contact">Contact</a>
                </nav>


                {/* Appointment Button */}
                <button className="appointment-btn">
                Book Appointment
                </button>

            </div>
        </header>
    )
}

export default Header;


import Header from "./components/Header/Header.jsx";
import Home from "./components/Home/Home.jsx";
import About from "./components/About/About.jsx";
import Doctors from "./components/Doctors/Doctors.jsx";
import Footer from "./components/footer/footer.jsx";
import "./App.css";

function App() {
  return (
    <div className="app-wrapper">
      <Header />
      
      <main className="main-content">
        <section id="home">
          <Home />
        </section>
        
        <section id="about">
          <About />
        </section>
        
        <section id="doctors">
          <Doctors />
        </section>
      </main>
      
      <Footer />
    </div>
  );
}

export default App;
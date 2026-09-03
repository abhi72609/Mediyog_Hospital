import Doctors from "./components/doctors/Doctors.jsx";
import Footer from "./components/footer/Footer.jsx";
import Header from "./components/Header/Header.jsx";
import Home from "./components/home/Home.jsx";

function App() {
  return(
    <>
      <Header />
      <main>

        <section id="home">
          <Home />
        </section>

        <section id="doctors">
          <Doctors />
        </section>


      </main>
      <Footer />
    </>
  )
}

export default App;
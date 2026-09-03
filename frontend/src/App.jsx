import Footer from "./components/Footer/Footer.jsx";
import Header from "./components/Header/Header.jsx";
import "./App.css";
import About from "./components/About/About.jsx";

function App() {
  return (
    <div className="app-wrapper">
      <Header />
      
      <main className="main-content">
        {/* Your page content will go here */}
        <About/>
      </main>
      
      <Footer />
    </div>
  );
}

export default App;
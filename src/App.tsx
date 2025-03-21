// App.tsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"; // Bootstrap CSS
import "./App.css";
import Header from "./components/Header"; // Import the Header component
import { Projects } from "./components/Projects";
import Navbar from "./components/Navbar";
import Kontakt from "./components/Kontakt";
import HarmoniCaseStudy from "./pages/HarmoniCaseStudy.tsx";
import AOS from "aos";
import "aos/dist/aos.css";
import MatSparCaseStudy from "./pages/MatSparCaseStudy.tsx";
import F1CaseStudy from "./pages/F1CaseStudy.tsx";
import AboutMe from "./pages/AboutMe.tsx";
import "./i18n";

AOS.init({
  duration: 800, // Animation duration in milliseconds
});

function App() {
  return (
    <Router>
      <div
        className="app"
        style={{
          minHeight: "100vh",
          paddingBottom: "400px",
          background: "#ffffff",
        }}
      >
        <Navbar />
        <div style={{ height: "40px" }} /> {/* Spacer element */}
        <div className="margin-wrapper">
          <div className="body-container">
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <Header />
                    <Projects />
                    <Kontakt />
                  </>
                }
              />
              <Route
                path="/case-study/harmoni"
                element={<HarmoniCaseStudy />}
              />
              <Route
                path="case-study/MatSpar"
                element={<MatSparCaseStudy />}
              ></Route>

              <Route path="/case-study/F1" element={<F1CaseStudy />}></Route>
              <Route path="/pages/AboutMe" element={<AboutMe />}></Route>
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;

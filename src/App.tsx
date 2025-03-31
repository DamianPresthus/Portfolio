import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Header from "./components/Header";
import { Projects } from "./components/Projects";
import Navbar from "./components/Navbar";
import Kontakt from "./components/Kontakt";
import HarmoniCaseStudy from "./pages/HarmoniCaseStudy.tsx";
import MatSparCaseStudy from "./pages/MatSparCaseStudy.tsx";
import F1CaseStudy from "./pages/F1CaseStudy.tsx";
import AboutMe from "./pages/AboutMe.tsx";
import LanguageLayout from "./LanguageLayout";
import "./i18n";
import AOS from "aos";
import "aos/dist/aos.css";

AOS.init({ duration: 800 });

function App() {
  return (
    <HashRouter>
      <div
        className="app"
        style={{
          minHeight: "100vh",
          paddingBottom: "400px",
          background: "#ffffff",
        }}
      >
        <Navbar />
        <div style={{ height: "40px" }} />
        <div className="margin-wrapper">
          <div className="body-container">
            <Routes>
              {/* Redirect "/" to "/no" by default */}
              <Route path="/" element={<Navigate to="/no" replace />} />

              {/* Language-specific routes */}
              <Route path="/:lng" element={<LanguageLayout />}>
                <Route
                  index
                  element={
                    <>
                      <Header />
                      <Projects />
                      <Kontakt />
                    </>
                  }
                />
                <Route
                  path="case-study/harmoni"
                  element={<HarmoniCaseStudy />}
                />
                <Route
                  path="case-study/MatSpar"
                  element={<MatSparCaseStudy />}
                />
                <Route path="case-study/F1" element={<F1CaseStudy />} />
                <Route path="pages/AboutMe" element={<AboutMe />} />
              </Route>
            </Routes>
          </div>
        </div>
      </div>
    </HashRouter>
  );
}

export default App;

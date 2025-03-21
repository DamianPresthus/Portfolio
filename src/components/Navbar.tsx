import React, { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const Navbar: React.FC = () => {
  const { i18n } = useTranslation();
  const navRef = useRef<HTMLElement>(null);
  const lastScrollY = useRef(window.scrollY);

  useEffect(() => {
    const handleScroll = () => {
      if (!navRef.current) return;

      // If we're near the top, always show the navbar
      if (window.scrollY < 50) {
        navRef.current.style.top = "0";
        lastScrollY.current = window.scrollY;
        return;
      }

      if (window.scrollY > lastScrollY.current) {
        // Scrolling down: hide the navbar
        navRef.current.style.top = "-100px"; // Adjust as needed based on navbar height
      } else {
        // Scrolling up: show the navbar
        navRef.current.style.top = "0";
      }

      lastScrollY.current = window.scrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLanguageSwitch = () => {
    const newLanguage = i18n.language === "en" ? "no" : "en";
    i18n.changeLanguage(newLanguage);
  };

  return (
    <nav
      ref={navRef}
      className="navbar navbar-expand-lg navbar-light shadow-sm bg-white fixed-top"
      style={{ transition: "top 0.3s ease-in-out" }} // Smooth transition effect
    >
      <div className="w-100">
        <div className="margin-wrapper d-flex align-items-center justify-content-between w-100">
          <Link className="navbar-brand fw-bold text-name" to="/">
            Damian Aaby Præsthus
          </Link>
          <button
            className="navbar-toggler border-0"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <button
                  className="btn btn-link nav-link"
                  onClick={handleLanguageSwitch}
                >
                  {i18n.language === "en" ? "NO" : "EN"}
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

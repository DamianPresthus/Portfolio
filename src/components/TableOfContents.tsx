import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const sections = [
  { id: "Harmoni", labelKey: "sections.harmoni" },
  { id: "Ws", labelKey: "sections.ws" },
  { id: "design", labelKey: "sections.design" },
  { id: "testing", labelKey: "sections.testing" },
  { id: "ui-branding", labelKey: "sections.uiBranding" },
  { id: "final-ui", labelKey: "sections.finalUI" },
  { id: "next-steps", labelKey: "sections.nextSteps" },
];

const TOCMatSpar: React.FC = () => {
  const { t } = useTranslation();
  const [activeSection, setActiveSection] = useState("");

  const handleScroll = () => {
    const scrollPosition = window.scrollY + 150;
    for (let section of sections) {
      const element = document.getElementById(section.id);
      if (element && element.offsetTop <= scrollPosition) {
        setActiveSection(section.id);
      }
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({ top: element.offsetTop - 100, behavior: "smooth" });
    }
  };

  return (
    <div className="toc-container">
      <ul className="toc-menu">
        {sections.map((section) => (
          <li
            key={section.id}
            className={section.id === activeSection ? "active" : ""}
            onClick={() => scrollToSection(section.id)}
          >
            {t(section.labelKey)}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TOCMatSpar;

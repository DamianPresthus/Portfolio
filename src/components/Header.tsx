import React from "react";
import profileImage from "/assets/proffil.jpg";
import { Link } from "react-router-dom";
import { useTranslation, Trans } from "react-i18next";

const Header: React.FC = () => {
  const { t } = useTranslation();

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: "smooth",
    });
  };

  return (
    <header className="mt-5">
      <div className="title-container">
        <h1 className="display-large">{t("header.portfolio")}</h1>
        <p className="display-sub text-muted">{t("header.description")}</p>
        <div className="portfolio-line mt-4 mb-3"></div>
      </div>

      <div className="header">
        {/* Image and Text Side by Side */}
        <div className="d-flex gap-3 mb-5">
          <img
            src={profileImage}
            alt={t("header.profileAlt", { name: "Damian" })}
            className="profile-img align-items-center mt-1"
          />
          <div>
            <p className="header-subtitle" style={{ marginTop: "11px" }}>
              <Trans i18nKey="header.intro">
                I am a <strong>UX/UI designer</strong> with <br />
                full-stack experience, focusing on creating user-centered
                interfaces.
              </Trans>
            </p>
            <div className="d-flex gap-1">
              <button
                className="btn custom-btn flex-grow-1"
                onClick={scrollToBottom}
              >
                {t("header.contact")}
              </button>
              <Link
                to="/pages/AboutMe"
                className="btn custom-btn-outline flex-grow-1"
              >
                {t("header.aboutMe")}
              </Link>
            </div>
          </div>
        </div>
        {/* Buttons Below */}
      </div>
    </header>
  );
};

export default Header;

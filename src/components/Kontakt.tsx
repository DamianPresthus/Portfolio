import React, { useState } from "react";
import { useTranslation } from "react-i18next";

const ContactButtons: React.FC = () => {
  const { t } = useTranslation();
  const email = "damian.aa.presthus@gmail.com";
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy email:", error);
    }
  };

  return (
    <div className="mt-5">
      <h2 className="mb-4">{t("contact.title")}</h2>
      <div className="d-flex flex-column gap-3">
        {/* Email Copy Button */}
        <button onClick={handleCopy} className="btn contact-btn email-btn">
          <i className={`fas ${copied ? "fa-check" : "fa-copy"} me-2`}></i>

          <span style={{ display: copied ? "none" : "inline" }}>
            damian.aa.presthus@gmail.com
          </span>
          <span style={{ display: copied ? "inline" : "none" }}>
            {t("contact.copied")}
          </span>
        </button>
        <a
          href="https://www.linkedin.com/in/damian-aaby-pr%C3%A6sthus-8001381a0/"
          target="_blank"
          rel="noopener noreferrer"
          className="btn contact-btn linkedin-btn"
        >
          <i className="fab fa-linkedin me-2"></i>
          LinkedIn
        </a>
      </div>
    </div>
  );
};

export default ContactButtons;

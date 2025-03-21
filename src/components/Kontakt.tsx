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
      <div className="d-flex flex-column gap-2">
        {/* Email Copy Button */}
        <button
          onClick={handleCopy}
          className="btn btn-outline-secondary"
          style={{
    
            height: "50px",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingLeft: "80px",
            paddingRight: "20px",
            backgroundColor: "#000000",
            color: "#ffffff",
            border: "none",
          }}
        >
          <span style={{ textAlign: "left", flex: 1 }}>{email}</span>
          <span style={{ textAlign: "right" }}>
            {copied ? (
              t("contact.copied")
            ) : (
              <i className="fas fa-copy" style={{ color: "#ffffff" }}></i>
            )}
          </span>
        </button>

        {/* LinkedIn Button */}
        <a
          href="https://www.linkedin.com/in/damian-aaby-pr%C3%A6sthus-8001381a0/"
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-outline-secondary"
          style={{
            width: "400px",
            height: "50px",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingRight: "20px",
            backgroundColor: "#e2e2e2",
            color: "#2e2e2e",
            border: "none",
            textDecoration: "none",
          }}
        >
          <span style={{ textAlign: "center", flex: 1 }}>LinkedIn</span>
          <span style={{ textAlign: "right" }}>
            <i className="fab fa-linkedin"></i>
          </span>
        </a>
      </div>
    </div>
  );
};

export default ContactButtons;

import React from "react";
import { useTranslation } from "react-i18next";

const SupportFeatures: React.FC = () => {
  const { t } = useTranslation();
  // Updated key path to include "nextSteps"
  const supportFeaturesRaw = t(
    "harmoniCaseStudy.supportFeaturesList",
    { returnObjects: true }
  );
  const supportFeatures = Array.isArray(supportFeaturesRaw)
    ? supportFeaturesRaw
    : [];

  return (
    <ul className="list-unstyled">
      {supportFeatures.map(
        (
          item: { icon: string; title: string; text: string },
          index: number
        ) => (
          <li key={index} className="mb-3 d-flex">
            <span className="me-2">{item.icon}</span>
            <div>
              <strong>{item.title}</strong>
              <p className="mb-0">{item.text}</p>
            </div>
          </li>
        )
      )}
    </ul>
  );
};

export default SupportFeatures;

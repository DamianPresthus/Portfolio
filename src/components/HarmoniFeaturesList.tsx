import React from "react";
import { useTranslation } from "react-i18next";

const AppFeatures: React.FC = () => {
  const { t } = useTranslation();
  // Update the key to match the JSON structure
  const featuresListRaw = t("harmoniCaseStudy.appFeaturesList", {
    returnObjects: true,
  });
  const featuresList = Array.isArray(featuresListRaw) ? featuresListRaw : [];

  return (
    <ul className="list-unstyled">
      {featuresList.map(
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

export default AppFeatures;

import React from "react";
import { useTranslation } from "react-i18next";

interface FeatureItem {
  icon: string;
  text: string;
}

const CoreFeatures: React.FC = () => {
  const { t } = useTranslation();

  // Retrieve the array of features from your translation file
  // e.g., "matSparCaseStudy.solution.features.items"
  const featuresListRaw = t("matSparCaseStudy.solution.features.items", {
    returnObjects: true,
  });
  const featuresList = Array.isArray(featuresListRaw) ? featuresListRaw : [];

  return (
    <ul className="list-unstyled">
      {featuresList.map((item: FeatureItem, index: number) => (
        <li key={index} className="d-flex align-items-start mb-1">
          <span className="me-2">{item.icon}</span>
          <span
            className="text"
            dangerouslySetInnerHTML={{ __html: item.text }}
          ></span>
        </li>
      ))}
    </ul>
  );
};

export default CoreFeatures;

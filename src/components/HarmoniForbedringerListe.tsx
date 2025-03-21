import React from "react";
import { useTranslation } from "react-i18next";

const FutureImprovements: React.FC = () => {
  const { t } = useTranslation();
  // Use the key "harmoniCaseStudy.futureImprovements" to fetch the list
  const improvementsListRaw = t("harmoniCaseStudy.futureImprovements", {
    returnObjects: true,
  });
  const improvementsList = Array.isArray(improvementsListRaw)
    ? improvementsListRaw
    : [];

  return (
    <ul className="list-unstyled">
      {improvementsList.map(
        (item: { icon: string; text: string }, index: number) => (
          <li key={index} className="d-flex align-items-start mb-3">
            <span className="me-2">{item.icon}</span>
            <span>{item.text}</span>
          </li>
        )
      )}
    </ul>
  );
};

export default FutureImprovements;

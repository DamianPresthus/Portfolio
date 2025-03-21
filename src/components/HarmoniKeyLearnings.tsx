import React from "react";
import { useTranslation } from "react-i18next";

const KeyLearnings: React.FC = () => {
  const { t } = useTranslation();
  // Updated key path to include "nextSteps"
  const learningsListRaw = t("harmoniCaseStudy.keyLearnings", {
    returnObjects: true,
  });
  const learningsList = Array.isArray(learningsListRaw) ? learningsListRaw : [];

  return (
    <ul className="list-unstyled">
      {learningsList.map(
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

export default KeyLearnings;

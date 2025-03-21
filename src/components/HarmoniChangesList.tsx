import React from "react";
import { useTranslation } from "react-i18next";

const ImplementedChanges: React.FC = () => {
  const { t } = useTranslation();
  // Use the full path as defined in your JSON
  const changesListRaw = t("harmoniCaseStudy.harmoniChangesList", {
    returnObjects: true,
  });
  const changesList = Array.isArray(changesListRaw) ? changesListRaw : [];

  return (
    <ul className="list-unstyled">
      {changesList.map(
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

export default ImplementedChanges;

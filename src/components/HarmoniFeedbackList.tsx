import React from "react";
import { useTranslation } from "react-i18next";

const FeedbackList: React.FC = () => {
  const { t } = useTranslation();
  // Access the nested key under harmoniCaseStudy
  const feedbackListRaw = t("harmoniCaseStudy.feedbackList", {
    returnObjects: true,
  });
  const feedbackList = Array.isArray(feedbackListRaw) ? feedbackListRaw : [];

  return (
    <ul className="list-unstyled">
      {feedbackList.map(
        (item: { icon: string; text: string }, index: number) => (
          <li key={index} className="d-flex align-items-start mb-1">
            <span className="me-2">{item.icon}</span>
            <span className="text">{item.text}</span>
          </li>
        )
      )}
    </ul>
  );
};

export default FeedbackList;

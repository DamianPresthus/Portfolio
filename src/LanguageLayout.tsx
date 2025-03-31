import { useEffect } from "react";
import { useParams, Outlet, Navigate } from "react-router-dom";
import i18n from "./i18n";

const LanguageLayout = () => {
  const { lng } = useParams();

  useEffect(() => {
    if (lng && i18n.language !== lng) {
      i18n.changeLanguage(lng);
    }
  }, [lng]);

  const supportedLanguages = ["no", "en"];
  if (!lng || !supportedLanguages.includes(lng)) {
    return <Navigate to="/no" replace />;
  }

  return <Outlet />;
};

export default LanguageLayout;

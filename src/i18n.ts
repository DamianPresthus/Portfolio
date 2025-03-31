// src/i18n.ts
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import HttpBackend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  .use(HttpBackend)
  .use(LanguageDetector) // 👈 Add this
  .use(initReactI18next)
  .init({
    fallbackLng: "no",
    ns: ["translation"],
    defaultNS: "translation",
    backend: {
      loadPath: "/Portfolio/locales/{{lng}}/{{ns}}.json",
    },
    detection: {
      order: ["path", "navigator"], // 👈 Detect language from URL path first
      lookupFromPathIndex: 0, // /no/page or /en/page
    },
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;

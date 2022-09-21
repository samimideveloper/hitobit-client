//ignore-localize

// init i18next
// for all options read: https://www.i18next.com/overview/configuration-options
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./messages/en";
import fa from "./messages/fa";

const languageNames = {
  fa: "فارسی",
  en: "English",
};

type Language = keyof typeof languageNames;

i18n.use(initReactI18next);

function getValidLanguage(lang: Language) {
  if (lang === "fa" || lang === "en") {
    return lang;
  }

  return "fa";
}

type Resources = {
  fa: Record<string, string>;
  en: Record<string, string>;
};

const initializeI18n = (lang = "fa", resources?: Resources) => {
  i18n.init({
    resources: {
      fa: {
        translation: { ...fa, ...resources?.fa },
      },
      en: {
        translation: { ...en, ...resources?.en },
      },
    },
    lng: getValidLanguage(lang as Language),
    fallbackLng: "fa",
    debug: false,
  });
};

const getLanguageName = () => {
  return languageNames[(i18n.language as keyof typeof languageNames) || "fa"];
};

export { i18n, initializeI18n, getLanguageName };

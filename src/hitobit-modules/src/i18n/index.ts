//ignore-localize

// init i18next
// for all options read: https://www.i18next.com/overview/configuration-options
import i18next from "i18next";
import {
  DefaultNamespace,
  initReactI18next,
  KeyPrefix,
  Namespace,
  useTranslation as useI18nTranslation,
  UseTranslationOptions,
  UseTranslationResponse,
} from "react-i18next";
import en from "./messages/en";
import fa from "./messages/fa";

const languageNames = {
  fa: "فارسی",
  en: "English",
};

type Language = keyof typeof languageNames;

const i18n = i18next.createInstance();

i18n.use(initReactI18next);

function getValidLanguage(lang: Language) {
  if (lang === "fa" || lang === "en") {
    return lang;
  }

  return "fa";
}

function useTranslation<
  N extends Namespace = DefaultNamespace,
  TKPrefix extends KeyPrefix<N> = undefined,
>(
  ns?: N | Readonly<N>,
  options?: UseTranslationOptions<TKPrefix>,
): UseTranslationResponse<N, TKPrefix> {
  return useI18nTranslation(ns, { ...options, i18n });
}

const initializeI18n = (lang = "fa") => {
  i18n.init({
    resources: {
      fa: {
        translation: fa,
      },
      en: {
        translation: en,
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

export { i18n, useTranslation, initializeI18n, getLanguageName };

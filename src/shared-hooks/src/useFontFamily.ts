import { useMemo } from "react";
import { useTranslation } from "react-i18next";

export const useFontFamily = () => {
  const { i18n } = useTranslation();

  const font = useMemo(() => {
    const lang = i18n.language;

    const faFont =
      __PLATFORM__ === "web" ? "YekanBakhFaRegular" : "IRANYekanFN";

    return lang === "fa" ? faFont : "HitobitPlex";
  }, [i18n.language]);

  return font;
};

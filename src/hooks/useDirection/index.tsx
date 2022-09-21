import { useTranslation } from "react-i18next";

export const useDirection = () => {
  const { i18n } = useTranslation();
  return {
    isRtl: i18n.language === "fa",
  };
};

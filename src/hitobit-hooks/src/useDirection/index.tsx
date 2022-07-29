import { useTranslation } from "hitobit-modules";

export const useDirection = () => {
  const { i18n } = useTranslation();
  return {
    isRtl: i18n.language === "fa",
  };
};

import { useTranslation } from "hitobit-modules";

const useProtectedPhoneNumber = (
  phoneNumber: string | undefined,
): string | undefined => {
  const { i18n } = useTranslation();

  const protectedPhoneNumber = phoneNumber?.replace(
    /(\d{5})\d{4}(\d{3})/,
    i18n.language === "en" || __PLATFORM__ !== "web" ? "$1****$2" : "$2****$1",
  );

  return protectedPhoneNumber;
};
export { useProtectedPhoneNumber };

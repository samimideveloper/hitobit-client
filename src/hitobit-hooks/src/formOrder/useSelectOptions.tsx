import { useTranslation } from "hitobit-modules";
import { SellSelectType } from "./marketForm/types";

const useSelectOptions = () => {
  const { t } = useTranslation();

  const options: SellSelectType[] = [
    {
      value: "amount",
      label: t("amount"),
    },
    {
      value: "total",
      label: t("total"),
    },
  ];

  return { options };
};

export { useSelectOptions };

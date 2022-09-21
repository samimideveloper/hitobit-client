import { useTranslation } from "react-i18next";
import { AppOrderType } from "../../services";

const useOrderTypeDisplay = () => {
  const { t } = useTranslation();

  // backend should match the type and response
  // its pascal case in type and upper case in response
  const orderTypeDisplay: Record<AppOrderType, string> = {
    LIMIT: t("limit"),
    LIMIT_MAKER: t("limitMaker"),
    MARKET: t("market"),
    STOP_LOSS_LIMIT: t("stopLimit"),
    STOP_LOSS: t("stopLimit"),
    TAKE_PROFIT: "Take profit",
    TAKE_PROFIT_LIMIT: "Take Profit Limit",
  };

  return {
    orderTypeDisplay,
  };
};

export { useOrderTypeDisplay };

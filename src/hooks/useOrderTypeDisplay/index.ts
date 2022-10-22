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
    STOP_LOSS_LIMIT: t("stopLoss"),
    STOP_LOSS: t("stopLoss"),
    TAKE_PROFIT: t("takeProfit"),
    TAKE_PROFIT_LIMIT: t("takeProfit"),
  };

  return {
    orderTypeDisplay,
  };
};

export { useOrderTypeDisplay };

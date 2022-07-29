import { useTranslation } from "hitobit-modules";
import { AppOrderStatus } from "hitobit-services/src";

const useOrderStatusDisplay = () => {
  const { t } = useTranslation();

  const orderStatusDisplay: Record<AppOrderStatus, string> = {
    CANCELED: t("cancel"),
    NEW: t("new"),
    REJECTED: t("Rejected"),
    EXPIRED: t("Expired"),
    NEW_ADL: t("Adl"),
    FILLED: t("filled"),
    PARTIALLY_FILLED: t("PartiallyFilled"),
    PENDING_CANCEL: t("PendingCancel"),
    NEW_INSURANCE: t("Insurance"),
  };

  const orderStatusOptions: { label?: string; value: AppOrderStatus }[] =
    Object.entries(orderStatusDisplay).map(([key, value]) => ({
      label: value,
      value: key as AppOrderStatus,
    }));

  return {
    orderStatusOptions,
    orderStatusDisplay,
  };
};

export { useOrderStatusDisplay };

import { useTranslation } from "react-i18next";
import {
  useGetPartyV1PrivateUsersettingPreference,
  usePostExchangeV1PrivateOrder,
} from "shared-services";
import { selectedSymbolStore } from "shared-store";
import { useMarketTicker } from "../../..";
import { useResetOnSymbol } from "../../useResetOnSymbol";
import { BuyForm, StopLimitOrderValues } from "../types";

const useSubmit = ({
  onOpenConfirmationModal,
}: {
  onOpenConfirmationModal?: (onConfirm: () => void) => void;
}) => {
  const { t } = useTranslation();
  const { selectedSymbol } = selectedSymbolStore.useState();

  const { getSymbolMarketTicker } = useMarketTicker();
  const selectedTicker = getSymbolMarketTicker(selectedSymbol?.symbol);

  const {
    handleSubmit: buyHandleSubmit,
    reset,
    setError,
  } = BuyForm.useFormContext();
  useResetOnSymbol(BuyForm.useFormContext);

  const { mutate, isLoading, error } = usePostExchangeV1PrivateOrder({
    onSuccess: () => {
      reset();
    },
  });
  const { data: userPreferences } = useGetPartyV1PrivateUsersettingPreference();

  const onBuySubmit = ({
    price,
    amount,
    stopPrice: _stopPrice,
  }: StopLimitOrderValues) => {
    const quantity = Number(amount);
    const stopPrice = Number(_stopPrice);

    if (!quantity) {
      setError("amount", {
        message: t("enterAmount"),
      });
    }

    if (!stopPrice) {
      setError("stopPrice", {
        message: t("enterStop"),
      });
    }

    const placeOrder = () => {
      mutate({
        requestBody: {
          type:
            Number(selectedTicker?.lastPrice) <= stopPrice
              ? "STOP_LOSS_LIMIT"
              : "TAKE_PROFIT_LIMIT",
          symbol: selectedSymbol?.symbol,
          quantity,
          side: "BUY",
          price: Number(price),
          stopPrice: Number(stopPrice),
          orderSourceType: "Trade",
          orderResponseType: "FULL",
          timeInForce: "GTC",
        },
      });
    };

    if (userPreferences?.stopLimitOrder && onOpenConfirmationModal) {
      onOpenConfirmationModal(placeOrder);

      return;
    }

    placeOrder();
  };

  return {
    onSubmit: buyHandleSubmit(onBuySubmit),
    isLoading,
    error,
  };
};

export { useSubmit };

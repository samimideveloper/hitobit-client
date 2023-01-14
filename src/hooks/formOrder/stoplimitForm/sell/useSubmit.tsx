import { useTranslation } from "react-i18next";
import { useAuth } from "react-oidc-js";
import {
  useGetPartyV1PrivateUsersettingPreference,
  usePostExchangeV1PrivateOrder,
} from "../../../../services";
import { selectedSymbolStore } from "../../../../store";
import { useMarketTicker } from "../../../marketTicker";
import { useClearPriceOnOrder } from "../../../useClearPriceOnOrder";
import { useResetOnSymbol } from "../../useResetOnSymbol";
import { SellForm, StopLimitOrderValues } from "../types";

const useSubmit = ({
  onOpenConfirmationModal,
}: {
  onOpenConfirmationModal?: (onConfirm: () => void) => void;
}) => {
  const { t } = useTranslation();

  const { selectedSymbol } = selectedSymbolStore.useState();

  const { getSymbolMarketTicker } = useMarketTicker();
  const selectedTicker = getSymbolMarketTicker(selectedSymbol?.symbol);

  const { handleSubmit: sellHandleSubmit, setError } =
    SellForm.useFormContext();
  useResetOnSymbol(SellForm.useFormContext);
  const { clearAllPrices } = useClearPriceOnOrder();

  const { userData } = useAuth();
  const { data: userPreferences } = useGetPartyV1PrivateUsersettingPreference({
    enabled: !!userData,
  });
  const { mutate, isLoading, error } = usePostExchangeV1PrivateOrder({
    onSuccess() {
      clearAllPrices();
    },
  });

  const onSellSubmit = ({
    price,
    amount,
    stopPrice: _stopPrice,
  }: StopLimitOrderValues) => {
    const quantity = Number(amount);
    const stopPrice = Number(_stopPrice);

    if (!stopPrice) {
      setError("stopPrice", {
        message: t("enterPrice"),
      });
      return;
    }

    if (!Number(price)) {
      setError("price", {
        message: t("enterPrice"),
      });
      return;
    }

    if (!quantity) {
      setError("amount", {
        message: t("enterAmount"),
      });
      return;
    }

    const placeOrder = () => {
      mutate({
        requestBody: {
          type:
            Number(selectedTicker?.lastPrice) >= stopPrice
              ? "STOP_LOSS_LIMIT"
              : "TAKE_PROFIT_LIMIT",
          symbol: selectedSymbol?.symbol,
          quantity: quantity,
          // quoteOrderQty: quoteOrderQty,
          side: "SELL",
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
    onSubmit: sellHandleSubmit(onSellSubmit),
    isLoading,
    error,
  };
};

export { useSubmit };

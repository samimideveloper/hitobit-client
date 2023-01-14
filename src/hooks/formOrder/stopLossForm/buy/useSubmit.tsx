import { useTranslation } from "react-i18next";
import { usePostExchangeV1PrivateOrder } from "../../../../services";
import { selectedSymbolStore } from "../../../../store";
import { useClearPriceOnOrder } from "../../../useClearPriceOnOrder";
import { useResetOnSymbol } from "../../useResetOnSymbol";
import { BuyForm, MarketOrderValues } from "../types";

const useSubmit = () => {
  const { t } = useTranslation();
  const { handleSubmit, setError } = BuyForm.useFormContext();
  const { selectedSymbol } = selectedSymbolStore.useState();
  const { clearAllPrices } = useClearPriceOnOrder();
  const { mutate, isLoading, error } = usePostExchangeV1PrivateOrder({
    onSuccess: () => {
      clearAllPrices();
    },
  });

  useResetOnSymbol(BuyForm.useFormContext);

  const onBuyStopLimitSubmit = ({
    amount,
    total,
    selectedOption,
    stopPrice,
  }: MarketOrderValues) => {
    let quantity: number | undefined;
    let quoteOrderQty: number | undefined;

    if (!Number(stopPrice)) {
      setError("stopPrice", {
        message: t("enterPrice"),
      });
      return;
    }

    if (selectedOption.value === "amount") {
      quantity = Number(amount);

      if (!quantity) {
        setError("amount", {
          message: t("enterAmount"),
        });
        return;
      }
    } else {
      quoteOrderQty = Number(total);
      if (!quoteOrderQty) {
        setError("total", {
          message: t("enterAmount"),
        });
        return;
      }
    }

    mutate({
      requestBody: {
        type: "STOP_LOSS",
        symbol: selectedSymbol?.symbol,
        quantity,
        quoteOrderQty,
        side: "BUY",
        stopPrice: Number(stopPrice),
        orderSourceType: "Trade",
        orderResponseType: "FULL",
        timeInForce: "GTC",
      },
    });
  };

  return {
    onSubmit: handleSubmit(onBuyStopLimitSubmit),
    isLoading,
    error,
  };
};

export { useSubmit };

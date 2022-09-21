import { useTranslation } from "react-i18next";
import { usePostExchangeV1PrivateOrder } from "../../../../services";
import { selectedSymbolStore } from "../../../../store";
import { MarketOrderValues, SellForm } from "../types";

const useSubmit = () => {
  const { t } = useTranslation();
  const { selectedSymbol } = selectedSymbolStore.useState();
  const { handleSubmit, reset, setError } = SellForm.useFormContext();
  const { mutate, isLoading, error } = usePostExchangeV1PrivateOrder({
    onSuccess: () => {
      reset();
    },
  });

  const onSellStopLimitSubmit = ({
    amount,
    selectedOption,
    stopPrice,
    total,
  }: MarketOrderValues) => {
    let quantity: number | undefined;
    let quoteOrderQty: number | undefined;

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
        quantity: quantity,
        quoteOrderQty: quoteOrderQty,
        side: "SELL",
        stopPrice: Number(stopPrice),
        orderSourceType: "Trade",
        orderResponseType: "FULL",
        timeInForce: "GTC",
      },
    });
  };

  return {
    onSubmit: handleSubmit(onSellStopLimitSubmit),
    isLoading,
    error,
  };
};

export { useSubmit };

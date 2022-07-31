import { useTranslation } from "hitobit-modules";
import { usePostExchangeV1PrivateOrder } from "hitobit-services";
import { selectedSymbolStore } from "hitobit-store";
import { useResetOnSymbol } from "../../useResetOnSymbol";
import { BuyForm, MarketOrderValues } from "../types";

const useSubmit = () => {
  const { t } = useTranslation();
  const { handleSubmit, reset, setError } = BuyForm.useFormContext();
  const { selectedSymbol } = selectedSymbolStore.useState();
  const { mutate, isLoading, error } = usePostExchangeV1PrivateOrder({
    onSuccess: () => {
      reset();
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

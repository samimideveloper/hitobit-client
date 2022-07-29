import { useTranslation } from "hitobit-modules";
import {
  useGetPartyV1PrivateUsersettingPreference,
  usePostExchangeV1PrivateOrderOco,
} from "hitobit-services";
import { selectedSymbolStore } from "hitobit-store";
import { useMarketTicker } from "../../..";
import { useResetOnSymbol } from "../../useResetOnSymbol";
import { BuyForm, OcoOrderValues } from "../types";

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

  const { mutate, isLoading, error } = usePostExchangeV1PrivateOrderOco({
    onSuccess: () => {
      reset();
    },
  });
  const { data: userPreferences } = useGetPartyV1PrivateUsersettingPreference();

  const onBuySubmit = ({
    price: _price,
    amount: _amount,
    limit: _limit,
    stopPrice: _stopPrice,
  }: OcoOrderValues) => {
    const amount = Number(_amount);
    const stopPrice = Number(_stopPrice);
    const price = Number(_price);
    const limit = Number(_limit);

    if (!amount) {
      setError("amount", {
        message: t("enterAmount"),
      });
    }

    if (!stopPrice) {
      setError("stopPrice", {
        message: t("enterStop"),
      });
    }
    if (!price) {
      setError("price", {
        message: t("enterStop"),
      });
    }
    if (!limit) {
      setError("limit", {
        message: t("enterStop"),
      });
    }

    const placeOrder = () => {
      mutate({
        // @todo type property is redundant
        // @ts-ignore
        requestBody: {
          symbol: selectedSymbol?.symbol,
          side: "BUY",
          price: Number(price),
          stopLimitPrice: Number(limit),
          stopPrice: Number(stopPrice),
          quantity: Number(amount),
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

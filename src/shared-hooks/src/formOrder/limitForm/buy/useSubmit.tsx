import { useTranslation } from "react-i18next";
import {
  useGetPartyV1PrivateUsersettingPreference,
  usePostExchangeV1PrivateOrder,
} from "shared-services";
import { selectedSymbolStore } from "shared-store";
import { useResetOnSymbol } from "../../useResetOnSymbol";
import { BuyForm, LimitOrderValues } from "../types";

const useSubmit = ({
  onOpenConfirmationModal,
}: {
  onOpenConfirmationModal?: (onConfirm: () => void) => void;
}) => {
  const { t } = useTranslation();
  const { selectedSymbol } = selectedSymbolStore.useState();

  const { data: userPreferences } = useGetPartyV1PrivateUsersettingPreference();

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

  const onBuySubmit = ({ price, amount }: LimitOrderValues) => {
    const quantity = Number(amount);

    if (!quantity) {
      setError("amount", {
        message: t("enterAmount"),
      });
      return;
    }

    const placeOrder = () => {
      mutate({
        requestBody: {
          type: "LIMIT",
          symbol: selectedSymbol?.symbol,
          quantity,
          // Back-end not supported quoteOrderQty in LIMIT order
          // quoteOrderQty: quoteQuantity,
          price: Number(price),
          side: "BUY",
          orderSourceType: "Trade",
          orderResponseType: "FULL",
          timeInForce: "GTC",
        },
      });
    };

    if (userPreferences?.limitOrder && onOpenConfirmationModal) {
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

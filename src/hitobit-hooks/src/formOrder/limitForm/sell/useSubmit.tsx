import { useTranslation } from "hitobit-modules";
import {
  useGetPartyV1PrivateUsersettingPreference,
  usePostExchangeV1PrivateOrder,
} from "hitobit-services";
import { selectedSymbolStore } from "hitobit-store";
import { useResetOnSymbol } from "../../useResetOnSymbol";
import { LimitOrderValues, SellForm } from "../types";

const useSubmit = ({
  onOpenConfirmationModal,
}: {
  onOpenConfirmationModal?: (onConfirm: () => void) => void;
}) => {
  const { t } = useTranslation();
  const {
    handleSubmit: sellHandleSubmit,
    reset,
    setError,
  } = SellForm.useFormContext();
  useResetOnSymbol(SellForm.useFormContext);

  const { selectedSymbol } = selectedSymbolStore.useState();

  const { mutate, isLoading, error } = usePostExchangeV1PrivateOrder({
    onSuccess() {
      reset();
    },
  });

  const { data: userPreferences } = useGetPartyV1PrivateUsersettingPreference();

  const onSellSubmit = ({ price, amount }: LimitOrderValues) => {
    const quantity = Number(amount);

    const placeOrder = () => {
      mutate({
        requestBody: {
          type: "LIMIT",
          symbol: selectedSymbol?.symbol,
          quantity,
          price: Number(price),
          side: "SELL",
          orderSourceType: "Trade",
          orderResponseType: "FULL",
          timeInForce: "GTC",
        },
      });
    };

    if (!quantity) {
      setError("amount", {
        message: t("enterAmount"),
      });

      return;
    }

    if (userPreferences?.limitOrder && onOpenConfirmationModal) {
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

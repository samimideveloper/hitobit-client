import { useTranslation } from "react-i18next";
import { useAuth } from "react-oidc-js";
import {
  useGetPartyV1PrivateUsersettingPreference,
  usePostExchangeV1PrivateOrder,
} from "../../../../services";
import { selectedSymbolStore } from "../../../../store";
import { useClearPriceOnOrder } from "../../../useClearPriceOnOrder";
import { useResetOnSymbol } from "../../useResetOnSymbol";
import { LimitOrderValues, SellForm } from "../types";

const useSubmit = ({
  onOpenConfirmationModal,
}: {
  onOpenConfirmationModal?: (onConfirm: () => void) => void;
}) => {
  const { t } = useTranslation();
  const { handleSubmit: sellHandleSubmit, setError } =
    SellForm.useFormContext();
  useResetOnSymbol(SellForm.useFormContext);
  const { clearAllPrices } = useClearPriceOnOrder();

  const { selectedSymbol } = selectedSymbolStore.useState();

  const { mutate, isLoading, error } = usePostExchangeV1PrivateOrder({
    onSuccess() {
      clearAllPrices();
    },
  });

  const { userData } = useAuth();
  const { data: userPreferences } = useGetPartyV1PrivateUsersettingPreference({
    enabled: !!userData,
  });
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

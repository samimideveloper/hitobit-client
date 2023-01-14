import { useTranslation } from "react-i18next";
import { useAuth } from "react-oidc-js";
import {
  useGetPartyV1PrivateUsersettingPreference,
  usePostExchangeV1PrivateOrder,
} from "../../../../services";
import { selectedSymbolStore } from "../../../../store";
import { useClearPriceOnOrder } from "../../../useClearPriceOnOrder";
import { useResetOnSymbol } from "../../useResetOnSymbol";
import { BuyForm, LimitOrderValues } from "../types";

const useSubmit = ({
  onOpenConfirmationModal,
}: {
  onOpenConfirmationModal?: (onConfirm: () => void) => void;
}) => {
  const { t } = useTranslation();
  const { selectedSymbol } = selectedSymbolStore.useState();
  const { userData } = useAuth();
  const { data: userPreferences } = useGetPartyV1PrivateUsersettingPreference({
    enabled: !!userData,
  });
  const { clearAllPrices } = useClearPriceOnOrder();

  const { handleSubmit: buyHandleSubmit, setError } = BuyForm.useFormContext();
  useResetOnSymbol(BuyForm.useFormContext);

  const { mutate, isLoading, error } = usePostExchangeV1PrivateOrder({
    onSuccess: () => {
      clearAllPrices();
    },
  });

  const onBuySubmit = ({ price, amount }: LimitOrderValues) => {
    const quantity = Number(amount);

    if (!Number(price)) {
      setError("price", { message: t("enterPrice") });
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

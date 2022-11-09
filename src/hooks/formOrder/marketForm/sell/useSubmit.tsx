import { useTranslation } from "react-i18next";
import { useAuth } from "react-oidc-js";
import {
  useGetPartyV1PrivateUsersettingPreference,
  usePostExchangeV1PrivateOrder,
} from "../../../../services";
import { selectedSymbolStore } from "../../../../store";
import { MarketOrderValues, SellForm } from "../types";

const useSubmit = ({
  onOpenConfirmationModal,
}: {
  onOpenConfirmationModal?: (onConfirm: () => void) => void;
}) => {
  const { t } = useTranslation();
  const { selectedSymbol } = selectedSymbolStore.useState();
  const { selectedOption } = SellForm.useWatch();
  const { handleSubmit, setError, reset } = SellForm.useFormContext();
  const { mutate, isLoading, error } = usePostExchangeV1PrivateOrder({
    onSuccess: () => {
      reset();
    },
  });
  const { userData } = useAuth();
  const { data: userPreferences } = useGetPartyV1PrivateUsersettingPreference({
    enabled: !!userData,
  });
  const placeMarketSellOrder = ({ amount, total }: MarketOrderValues) => {
    let quantity: number | undefined;
    let quoteQuantity: number | undefined;

    const placeOrder = () => {
      mutate({
        requestBody: {
          type: "MARKET",
          symbol: selectedSymbol?.symbol,
          quantity: quantity,
          quoteOrderQty: quoteQuantity,
          side: "SELL",
          orderSourceType: "Trade",
        },
      });
    };

    if (selectedOption.value === "amount") {
      quantity = Number(amount);

      if (!quantity) {
        setError("amount", {
          message: t("enterAmount"),
        });
        return;
      }
    } else {
      quoteQuantity = Number(total);

      if (!quoteQuantity) {
        setError("total", {
          message: t("enterAmount"),
        });
        return;
      }
    }

    if (userPreferences?.marketOrder && onOpenConfirmationModal) {
      onOpenConfirmationModal(placeOrder);

      return;
    }

    placeOrder();
  };

  return {
    onSubmit: handleSubmit(placeMarketSellOrder),
    isLoading,
    error,
  };
};

export { useSubmit };

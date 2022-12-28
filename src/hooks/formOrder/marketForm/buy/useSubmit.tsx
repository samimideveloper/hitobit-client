import { useTranslation } from "react-i18next";
import { useAuth } from "react-oidc-js";
import {
  useGetPartyV1PrivateUsersettingPreference,
  usePostExchangeV1PrivateOrder,
} from "../../../../services";
import { selectedSymbolStore } from "../../../../store";
import { useClearPriceOnOrder } from "../../../useClearPriceOnOrder";
import { useResetOnSymbol } from "../../useResetOnSymbol";
import { BuyForm, MarketOrderValues } from "../types";

const useSubmit = ({
  onOpenConfirmationModal,
}: {
  onOpenConfirmationModal?: (onConfirm: () => void) => void;
}) => {
  const { t } = useTranslation();
  const { handleSubmit, setError } = BuyForm.useFormContext();
  const { selectedOption } = BuyForm.useWatch();
  const { selectedSymbol } = selectedSymbolStore.useState();
  const { clearAllPrices } = useClearPriceOnOrder();
  const { mutate, isLoading, error } = usePostExchangeV1PrivateOrder({
    onSuccess: () => {
      clearAllPrices();
    },
  });

  const { userData } = useAuth();
  const { data: userPreferences } = useGetPartyV1PrivateUsersettingPreference({
    enabled: !!userData,
  });
  useResetOnSymbol(BuyForm.useFormContext);

  const placeMarketBuyOrder = ({ amount, total }: MarketOrderValues) => {
    let quantity: number | undefined;
    let quoteQuantity: number | undefined;

    const placeOrder = () => {
      mutate({
        requestBody: {
          type: "MARKET",
          symbol: selectedSymbol?.symbol,
          quantity: quantity,
          quoteOrderQty: quoteQuantity,
          side: "BUY",
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
    onSubmit: handleSubmit(placeMarketBuyOrder),
    isLoading,
    error,
  };
};

export { useSubmit };

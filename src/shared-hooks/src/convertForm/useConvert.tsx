import {
  AppOrderType,
  usePostExchangeV1PrivateOrder,
} from "shared-services/src";
import { useMatchedMarketsList } from "../useMatchedMarketsList";
import { useQuantity } from "../useQuantity";
import { ConvertContext, ConvertProps } from "./context";

type OrderProps = {
  triggerBeforeOrder?: () => void;
  type: AppOrderType;
};

export const useConvert = (callbacks?: ConvertProps) => {
  if (typeof ConvertContext.context === "undefined") {
    throw new Error("You must use this hook under the ConvertProvider.");
  }

  const { setValue, handleSubmit } = ConvertContext.useFormContext();

  const { fromAsset, toMarket, fromAmount, toAmount, price } =
    ConvertContext.useWatch();

  const { selectedMarket, isBuy } = useMatchedMarketsList({
    fromAsset,
    toMarket,
  });

  const { getQuantity } = useQuantity({
    toAmount,
    fromAmount,
    fromAsset,
    toMarket,
  });

  const { mutate, isLoading, error, reset } = usePostExchangeV1PrivateOrder({
    onSuccess: (data) => {
      setValue("fromAmount", "");
      setValue("toAmount", "");
      callbacks?.onSuccess?.(data);
    },
    onError: (error) => {
      callbacks?.onError?.(error);
    },
  });

  const createQuantity = (type: AppOrderType) => {
    const { quantity: _quantity, quoteOrderQty } = getQuantity();

    if (type === "LIMIT") {
      let quantity = _quantity;

      if (quoteOrderQty !== undefined) {
        quantity = quoteOrderQty / Number(price);
      }

      return { quantity };
    }

    return {
      quantity: _quantity,
      quoteOrderQty,
    };
  };

  const onSubmit = async ({ triggerBeforeOrder, type }: OrderProps) => {
    await new Promise((resolve) => resolve(triggerBeforeOrder?.()));
    const order = () => {
      if ((toAmount || fromAmount) && fromAsset) {
        if (selectedMarket && isBuy) {
          mutate({
            requestBody: {
              type,
              symbol: selectedMarket.name,
              side: "BUY",
              orderSourceType: "Convert",
              ...createQuantity(type),
            },
          });
        } else if (selectedMarket && !isBuy) {
          mutate({
            requestBody: {
              type,
              symbol: selectedMarket.name,
              side: "SELL",
              orderSourceType: "Convert",
              ...createQuantity(type),
            },
          });
        }
      }
    };

    handleSubmit(order)();
  };

  return {
    onSubmit,
    isLoading,
    error,
    reset,
    fromAmount,
    toAmount,
    fromAsset,
    toMarket,
  };
};

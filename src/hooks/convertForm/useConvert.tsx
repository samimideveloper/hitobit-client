import { AppOrderType, usePostExchangeV1PrivateOrder } from "../../services";
import { useMatchedMarketsList } from "../useMatchedMarketsList";
import { useQuantity } from "../useQuantity";
import { ConvertContext, ConvertProps } from "./context";

type OrderProps = {
  triggerBeforeOrder?: () => Promise<void> | void;
  type: AppOrderType;
};

export const useConvert = (callbacks?: ConvertProps) => {
  if (typeof ConvertContext.context === "undefined") {
    throw new Error("You must use this hook under the ConvertProvider.");
  }

  const { setValue, handleSubmit, getValues } = ConvertContext.useFormContext();

  const { fromAsset, toMarket, fromAmount, toAmount, lastChangedField } =
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
    const { price } = getValues();
    const { quantity: _quantity, quoteOrderQty } = getQuantity();

    if (type === "LIMIT") {
      let quantity = _quantity;

      if (quoteOrderQty !== undefined) {
        quantity = quoteOrderQty / Number(price);
      }

      return { quantity, price: Number(price) };
    }

    return {
      quantity: _quantity,
      quoteOrderQty,
    };
  };

  const onSubmit = async ({ triggerBeforeOrder, type }: OrderProps) => {
    await triggerBeforeOrder?.();
    const order = handleSubmit(() => {
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
    });

    order();
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
    isBuy,
    lastChangedField,
  };
};

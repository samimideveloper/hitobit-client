import { useCallback } from "react";
import { useMarkets } from "../useMarkets";
import { useMatchedMarketsList } from "../useMatchedMarketsList";

export type QuantityProps = {
  toAmount?: string | null;
  fromAmount?: string | null;
  fromAsset: string | undefined;
  toMarket: string | undefined;
};

export function useQuantity({
  toAmount,
  fromAmount,
  fromAsset,
  toMarket,
}: QuantityProps) {
  const { marketsSymbols, isLoading } = useMarkets();
  const availableSymbols = marketsSymbols?.filter(
    (item) => fromAsset === item.baseAsset || fromAsset === item.quoteAsset,
  );

  const { isBuy } = useMatchedMarketsList({ fromAsset, toMarket });
  const getQuantity = useCallback(() => {
    if (isBuy) {
      return {
        quoteOrderQty: fromAmount ? Number(fromAmount) : undefined,
        quantity: toAmount ? Number(toAmount) : undefined,
      };
    }

    return {
      quantity: fromAmount ? Number(fromAmount) : undefined,
      quoteOrderQty: toAmount ? Number(toAmount) : undefined,
    };
  }, [fromAmount, isBuy, toAmount]);

  return { getQuantity, availableSymbols, isLoading };
}

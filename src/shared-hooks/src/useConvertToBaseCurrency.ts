import { useCallback } from "react";
import { baseCurrencyStore } from "shared-store";
import { useConvertBaseToQuote } from "./useConvertBaseToQuote";

const useBaseCurrency = () => {
  const { baseCurrency } = baseCurrencyStore.useState(["baseCurrency"]);
  return { baseCurrency };
};

const useConvertToBaseCurrency = () => {
  const { baseCurrency } = baseCurrencyStore.useState(["baseCurrency"]);

  const chosenBaseCurrency = baseCurrency.asset;

  const getConvertBaseToAsset = useConvertBaseToQuote();

  const convertToBaseCurrency = useCallback(
    (amount: number, asset: string) => {
      if (!amount) {
        return 0;
      }

      const fiatPrice = getConvertBaseToAsset(
        amount,
        asset,
        chosenBaseCurrency,
      );

      return fiatPrice;
    },
    [chosenBaseCurrency, getConvertBaseToAsset],
  );
  return {
    convertToBaseCurrency,
  };
};

export { useConvertToBaseCurrency, useBaseCurrency };

import { useCallback, useMemo } from "react";
import starkString from "starkstring";
import { useConvertNumToAbbr } from "../convertNumToAbbr";
import { useConvertBaseToQuote } from "../useConvertBaseToQuote";
import { useMatchedMarketsList } from "../useMatchedMarketsList";
import { useQuantity } from "../useQuantity";
import { useStepSize } from "../useStepSize";
import { ConvertContext } from "./context";

export const useConvertPrice = () => {
  if (typeof ConvertContext.context === "undefined") {
    throw new Error("You must use this hook under the ConvertProvider.");
  }

  const convert = useConvertBaseToQuote();

  const { fromAsset, toMarket, fromAmount, toAmount } =
    ConvertContext.useWatch();

  const { selectedMarket, isFromSelectedBaseAsset } = useMatchedMarketsList({
    fromAsset,
    toMarket,
  });

  const { toTickSize } = useStepSize(selectedMarket?.name);

  const { convertNumToAbbr } = useConvertNumToAbbr();

  const { getQuantity } = useQuantity({
    toAmount,
    fromAmount,
    fromAsset,
    toMarket,
  });

  const { convertedPrice } = useMemo(() => {
    const fromCurrency = fromAsset?.toUpperCase();

    const market = isFromSelectedBaseAsset
      ? selectedMarket?.quoteAsset
      : selectedMarket?.baseAsset;
    const amountInverse = convert(
      1,
      fromCurrency || "",
      market?.toUpperCase() || "",
    );

    const amount = convert(1, market?.toUpperCase() || "", fromCurrency || "");

    const convertedPrice = {
      selectedMarket: market?.toUpperCase() || "--",
      selectedAsset: fromCurrency || "--",
      value: starkString(toTickSize(amount, fromCurrency))
        .toCurrency()
        .toString(),
      reversedValue: starkString(
        toTickSize(amountInverse, market?.toUpperCase()),
      )
        .toCurrency()
        .toString(),
    };
    return { convertedPrice };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [convert, fromAsset, getQuantity, selectedMarket]);

  const receivedFromSelectedAsset = useCallback(
    (fallback?: string) => {
      const asset = isFromSelectedBaseAsset
        ? selectedMarket?.quoteAsset
        : selectedMarket?.baseAsset;
      if (fromAmount !== "" && typeof fromAmount === "string") {
        const amount = convert(
          Number(fromAmount),
          fromAsset || "",
          asset || "",
        );
        const _amount = starkString(toTickSize(amount, asset))
          .toCurrency()
          .toString();

        return `${_amount || 0} ${asset}`;
      }

      if (toAmount !== "" && typeof toAmount === "string") {
        const amount = convert(Number(toAmount), asset || "", fromAsset || "");

        const _amount = convertNumToAbbr({
          input: amount,
        });

        return `${_amount} ${fromAsset}`;
      }
      return fallback || `--`;
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [convert, fromAmount, fromAsset, toAmount, selectedMarket],
  );

  return {
    convertedPrice,
    receivedFromSelectedAsset,
  };
};

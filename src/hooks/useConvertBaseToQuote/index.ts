import Decimal from "decimal.js";
import { useCallback } from "react";
import { useMarketTicker } from "../marketTicker";

export function useConvertBaseToQuote() {
  const { marketsTicker } = useMarketTicker();

  const convertBaseToAsset = useCallback(
    (assetCount: number, _baseCurrency?: string, _quoteCurrency?: string) => {
      if (!_baseCurrency || !_quoteCurrency) {
        return 0;
      }
      const baseCurrency = _baseCurrency.toLowerCase();
      const quoteCurrency = _quoteCurrency.toLowerCase();

      // Similar Inputs
      if (baseCurrency === quoteCurrency || !assetCount) {
        return assetCount;
      }

      // Direct Match Exists
      const directMatch = marketsTicker?.find(
        (item) => item.symbol?.toLowerCase() === baseCurrency + quoteCurrency,
      );
      if (directMatch && directMatch.lastPrice !== undefined) {
        return Number(
          new Decimal(directMatch.lastPrice)
            .mul(assetCount)
            .toFixed(directMatch.quoteCurrency?.decimalDigits),
        );
      }

      // Reverse Direct Match Exists
      const reverseDirectMatch = marketsTicker?.find(
        (item) => item.symbol?.toLowerCase() === quoteCurrency + baseCurrency,
      );
      if (reverseDirectMatch) {
        return reverseDirectMatch.lastPrice
          ? Number(
              new Decimal(assetCount)
                .div(reverseDirectMatch.lastPrice)
                .toFixed(reverseDirectMatch.baseCurrency?.decimalDigits),
            )
          : 0;
      }

      let indirectBaseLastPrice: number | undefined;
      let indirectQuoteLastPrice: number | undefined;
      let numberOfDecimalDigits: number | undefined;
      // Indirect Match Exists
      for (const item of marketsTicker || []) {
        const baseMatched = item.baseAsset?.toLowerCase() === baseCurrency;

        const quoteMatched = marketsTicker?.find(
          (quoteItem) =>
            quoteItem.symbol?.toLowerCase() ===
            quoteCurrency + item?.quoteAsset?.toLowerCase(),
        );

        if (baseMatched && quoteMatched) {
          indirectBaseLastPrice = item.lastPrice;
          indirectQuoteLastPrice = quoteMatched.lastPrice;
          numberOfDecimalDigits = quoteMatched.baseCurrency?.decimalDigits;

          break;
        }

        const baseMatchedQuote =
          item.quoteAsset?.toLowerCase() === baseCurrency;

        const quoteMatchedBase = marketsTicker?.find(
          (item) =>
            item.symbol?.toLowerCase() ===
            quoteCurrency + item?.baseAsset?.toLowerCase(),
        );

        if (
          baseMatchedQuote &&
          quoteMatchedBase &&
          item.lastPrice !== undefined
        ) {
          indirectBaseLastPrice = 1 / item.lastPrice;
          indirectQuoteLastPrice = quoteMatchedBase.lastPrice;
          numberOfDecimalDigits = quoteMatchedBase.baseCurrency?.decimalDigits;

          break;
        }

        // Indirect Match , same base
        const indirectBaseMatchedQuote =
          item.quoteAsset?.toLowerCase() === baseCurrency;

        const indirectQuoteMatchedBase = marketsTicker?.find(
          (quoteItem) =>
            quoteItem.symbol?.toLowerCase() ===
            item?.baseAsset?.toLowerCase() + quoteCurrency,
        );

        if (indirectBaseMatchedQuote && indirectQuoteMatchedBase) {
          indirectBaseLastPrice = indirectQuoteMatchedBase.lastPrice;
          indirectQuoteLastPrice = item.lastPrice;
          numberOfDecimalDigits =
            indirectQuoteMatchedBase.quoteCurrency?.decimalDigits;

          break;
        }
      }

      if (indirectBaseLastPrice && indirectQuoteLastPrice) {
        return Number(
          new Decimal(indirectBaseLastPrice)
            .div(indirectQuoteLastPrice)
            .mul(assetCount)
            .toFixed(numberOfDecimalDigits || 0),
        );
      }

      return 0;
    },
    [marketsTicker],
  );

  return convertBaseToAsset;
}

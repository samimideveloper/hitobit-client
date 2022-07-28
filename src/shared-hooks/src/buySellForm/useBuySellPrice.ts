import { useMemo } from "react";
import starkString from "starkstring";
import { useMarketTicker } from "../marketTicker";
import { useConvertBaseToQuote } from "../useConvertBaseToQuote";
import { BuySellContext } from "./context";

export const useBuySellPrice = (mode: "buy" | "sell") => {
  if (typeof BuySellContext.context === "undefined") {
    throw new Error("You must use this hook under the BuySellProvider.");
  }

  const { getSymbolMarketTicker } = useMarketTicker();

  const convert = useConvertBaseToQuote();

  const { recieve, selected, lastChangeInput, spend } =
    BuySellContext.useWatch();

  const selectedMarket = getSymbolMarketTicker(selected);

  const { convertedPrice } = useMemo(() => {
    const convertedPrice = {
      baseAsset: selectedMarket?.baseAsset || "--",
      quoteAsset: selectedMarket?.quoteAsset || "--",
      value: convert(1, selectedMarket?.quoteAsset, selectedMarket?.baseAsset),
      reversedValue: convert(
        1,
        selectedMarket?.baseAsset,
        selectedMarket?.quoteAsset,
      ),
    };
    return { convertedPrice };
  }, [convert, selectedMarket]);

  const calculateRecieveOrSpendSell = useMemo(() => {
    if (lastChangeInput === "spend") {
      const value = convert(
        Number(spend || 0),
        selectedMarket?.baseAsset,
        selectedMarket?.quoteAsset,
      );
      return starkString(value).toCurrency().toString();
    } else {
      const value = convert(
        Number(recieve || 0),
        selectedMarket?.quoteAsset,
        selectedMarket?.baseAsset,
      );
      return starkString(value).toCurrency().toString();
    }
  }, [convert, lastChangeInput, recieve, selectedMarket, spend]);

  const calculateRecieveOrSpendBuy = useMemo(() => {
    if (lastChangeInput === "spend") {
      const value = convert(
        Number(spend || 0),
        selectedMarket?.quoteAsset,
        selectedMarket?.baseAsset,
      );
      return starkString(value).toCurrency().toString();
    } else {
      const value = convert(
        Number(recieve || 0),
        selectedMarket?.baseAsset,
        selectedMarket?.quoteAsset,
      );
      return starkString(value).toCurrency().toString();
    }
  }, [convert, lastChangeInput, recieve, selectedMarket, spend]);

  const calculateRecieveOrSpend =
    mode === "buy" ? calculateRecieveOrSpendBuy : calculateRecieveOrSpendSell;

  return {
    convertedPrice,
    calculateRecieveOrSpend,
  };
};

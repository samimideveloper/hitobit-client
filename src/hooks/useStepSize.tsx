import Decimal from "decimal.js";
import { useCallback } from "react";
import { MarketFilterLotSize, MarketFilterPriceFilter } from "../utils";
import { useMarketTicker } from "./marketTicker";

const useStepSize = (symbol?: string) => {
  const { getSymbolMarketTicker } = useMarketTicker();
  const targetMarket = getSymbolMarketTicker(symbol);

  const toStepSize = useCallback(
    (value: number | Decimal | string, passedSymbol?: string) => {
      const selectedMarketTicker = passedSymbol
        ? getSymbolMarketTicker(passedSymbol)
        : targetMarket;
      const stepSize = (
        selectedMarketTicker?.filters?.find(
          ({ filterType }) => filterType === "LOT_SIZE",
        ) as MarketFilterLotSize
      )?.stepSize;

      if (stepSize !== undefined && value !== "") {
        return new Decimal(value)
          .div(stepSize)
          .floor()
          .mul(stepSize)
          .toString();
      }
      return value.toString();
    },
    [getSymbolMarketTicker, targetMarket],
  );
  const toTickSize = useCallback(
    (value: number | Decimal | string, passedSymbol?: string) => {
      const selectedMarketTicker = passedSymbol
        ? getSymbolMarketTicker(passedSymbol)
        : targetMarket;
      const tickSize = (
        selectedMarketTicker?.filters?.find(
          ({ filterType }) => filterType === "PRICE_FILTER",
        ) as MarketFilterPriceFilter
      )?.tickSize;

      if (tickSize !== undefined && value !== "") {
        return new Decimal(value)
          .div(tickSize)
          .floor()
          .mul(tickSize)
          .toString();
      }
      return value.toString();
    },
    [getSymbolMarketTicker, targetMarket],
  );

  return { toStepSize, toTickSize };
};

export { useStepSize };

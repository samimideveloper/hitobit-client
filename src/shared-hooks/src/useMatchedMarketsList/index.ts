import { useMarkets } from "../useMarkets";

export function useMatchedMarketsList({
  fromAsset,
  toMarket,
}: {
  fromAsset: string | undefined;
  toMarket: string | undefined;
}) {
  const fromCurrency = fromAsset?.toLowerCase();

  const { marketsSymbols, getSymbolMarketDetails } = useMarkets();

  const availableSymbols = marketsSymbols?.filter(
    (item) => fromAsset === item.baseAsset || fromAsset === item.quoteAsset,
  );

  const selectedMarket = getSymbolMarketDetails(toMarket);

  const isFromSelectedBaseAsset =
    selectedMarket?.baseAsset?.toLowerCase() === fromCurrency?.toLowerCase();

  const isFromSelectedQuoteAsset =
    selectedMarket?.quoteAsset?.toLowerCase() === fromCurrency?.toLowerCase();

  const matchedBase = (availableSymbols || []).filter(
    ({ baseAsset }) => baseAsset === fromAsset,
  );
  const matchedQuote = (availableSymbols || []).filter(
    ({ quoteAsset }) =>
      quoteAsset === fromAsset &&
      !matchedBase.find(({ baseAsset }) => baseAsset === fromAsset),
  );

  const availableToMarkets = [...matchedBase, ...matchedQuote];

  const isBuy = !!isFromSelectedQuoteAsset;

  return {
    availableToMarkets,
    isFromSelectedQuoteAsset,
    isFromSelectedBaseAsset,
    selectedMarket,
    isBuy,
  };
}

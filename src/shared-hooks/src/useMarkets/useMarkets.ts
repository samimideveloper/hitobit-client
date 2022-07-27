import { groupBy, map } from "lodash-es";
import { useCallback, useMemo } from "react";
import { useGetExchangeV1PublicMarkets } from "shared-services";
import { RequestError } from "shared-services/src/services/config";
import { MarketResponse, MarketSymbolResponse } from "shared-utils/src";
import { Asset, useAssets } from "../useAssets";

export interface Market extends MarketSymbolResponse {
  baseCurrency: Asset | undefined;
  quoteCurrency: Asset | undefined;
}

function useMarkets(
  onSuccess?: (data?: MarketSymbolResponse[]) => void,
  onError?: (error?: RequestError | Error) => void,
): {
  marketsSymbols: Market[] | undefined;
  getSymbolMarketDetails: (symbol: string | undefined) => Market | undefined;
  isLoading?: boolean;
  error?: RequestError | Error | null;
} {
  const {
    data: { symbols: symbols } = {},
    isLoading,
    error: marketError,
  } = useGetExchangeV1PublicMarkets(
    {},
    {
      cacheTime: Infinity,
      staleTime: Infinity,
      onSuccess: (data) =>
        onSuccess?.((data as unknown as MarketResponse)?.symbols),
      onError: (e) => onError?.(e),
    },
  );

  const {
    allAssets,
    isLoading: isAssetLoading,
    error: errorAssets,
  } = useAssets();

  const marketsSymbols = useMemo(() => {
    if (!symbols) {
      return;
    }

    const groupedAssets = groupBy(allAssets, (coin) => coin.symbol);
    const groupedMarket = groupBy(symbols, (market) => market.name);

    return map(groupedMarket, (market) => {
      const baseCurrency = groupedAssets[market[0].baseAsset!]?.[0];
      const quoteCurrency = groupedAssets[market[0].quoteAsset!]?.[0];

      return {
        ...(market[0] as unknown as MarketSymbolResponse),
        baseCurrency,
        quoteCurrency,
      };
    });
  }, [allAssets, symbols]);

  const getSymbolMarketDetails = useCallback(
    (symbol: string | undefined) => {
      if (!symbol) {
        return;
      }

      return marketsSymbols?.find(({ name }) => name === symbol);
    },
    [marketsSymbols],
  );

  return {
    marketsSymbols,
    getSymbolMarketDetails,
    error: errorAssets || marketError,
    isLoading: isLoading || isAssetLoading,
  };
}

export { useMarkets };

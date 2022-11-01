import { useQueryClient } from "@tanstack/react-query";
import { groupBy, map } from "lodash-es";
import { createContext, memo, useContext, useMemo } from "react";
import {
  getExchangeV1PublicAlltickers24hr,
  getExchangeV1PublicMarkets,
  getExchangeV1PublicTrades,
  MarketTickerPriceResponseVM,
  useGetExchangeV1PublicAlltickers24hr,
} from "../../services";
import { SocketConnection } from "../socketConnection";
import { Market, useMarkets } from "../useMarkets";
import { mapMiniTicker } from "./types";

export type MarketTicker = MarketTickerPriceResponseVM &
  Partial<Omit<Market, keyof MarketTickerPriceResponseVM>>;

interface TickerContextProps {
  marketsTicker: MarketTicker[] | undefined;
  isMarketTickerLoading: boolean;
  refetch: () => void;
}

const TickerContext = createContext<TickerContextProps>({
  marketsTicker: [],
  isMarketTickerLoading: false,
  refetch: () => null,
});

interface Props {}
const MarketTickerProvider = memo<Props>(({ children }: any) => {
  const queryClient = useQueryClient();

  const {
    data: ticker,
    isLoading,
    refetch,
  } = useGetExchangeV1PublicAlltickers24hr({
    cacheTime: 2 * 60 * 1000,
    staleTime: 2 * 60 * 1000,
  });

  const { marketsSymbols } = useMarkets();

  SocketConnection.useEvent("!miniTicker@arr", (data) => {
    if (!data) return;

    const socketData = mapMiniTicker(data || []);
    const grouped = groupBy(socketData, (item) => item.symbol);

    queryClient.setQueriesData<MarketTickerPriceResponseVM[] | undefined>(
      [getExchangeV1PublicAlltickers24hr.key],
      (prev) => {
        let updateNeeded = false;

        const result = prev?.map((item) => {
          const found = grouped[item.symbol!]?.[0];

          if (!found) return item;

          if (
            item.lastMarketInfoChangeDate !== found.lastMarketInfoChangeDate
          ) {
            updateNeeded = true;
          }

          return {
            ...item,
            lastPrice: Number(found.closePrice),
            openPrice: Number(found.openPrice),
            highPrice: Number(found.highPrice),
            lowPrice: Number(found.lowPrice),
            volume: Number(found.volume),
            quoteVolume: Number(found.quoteVolume),
            smartTradeEngine: found.smartTradeEngine,
            lastMarketInfoChangeDate: found.lastMarketInfoChangeDate,
          };
        });

        if (updateNeeded) {
          queryClient.invalidateQueries({
            queryKey: [getExchangeV1PublicMarkets.key],
            refetchType: "all",
            exact: true,
          });
          queryClient.invalidateQueries({
            queryKey: [getExchangeV1PublicTrades.key],
            refetchType: "all",
            exact: true,
          });
        }

        return result;
      },
    );
  });

  const marketsTicker = useMemo(() => {
    const groupedTicker = groupBy(ticker || [], (item) => item.symbol);
    const groupedMarkets = groupBy(marketsSymbols || [], (item) => item.name);

    return map(groupedTicker, (item, key) => {
      return {
        ...groupedMarkets[key]?.[0],
        ...item[0],
      };
    });
  }, [marketsSymbols, ticker]);

  const value = useMemo(() => {
    return {
      isMarketTickerLoading: isLoading,
      marketsTicker,
      refetch,
    };
  }, [marketsTicker, isLoading, refetch]);

  return (
    <TickerContext.Provider value={value}>{children}</TickerContext.Provider>
  );
});

function useMarketTicker() {
  const { marketsTicker, isMarketTickerLoading, refetch } =
    useContext(TickerContext);
  const getSymbolMarketTicker = (symbol: string | undefined) => {
    if (!symbol) {
      return;
    }

    return marketsTicker?.find(
      ({ name, symbol: _symbol }) => name === symbol || _symbol === symbol,
    );
  };
  return {
    marketsTicker,
    getSymbolMarketTicker,
    isMarketTickerLoading,
    refetch,
  };
}

const MarketTickerProviderHas = createContext(false);

const MarketTickerProviderContainer = ({ children }: any) => {
  const hasProvider = useContext(MarketTickerProviderHas);

  return hasProvider ? (
    children
  ) : (
    <MarketTickerProviderHas.Provider value={true}>
      <MarketTickerProvider>{children}</MarketTickerProvider>
    </MarketTickerProviderHas.Provider>
  );
};

export {
  useMarketTicker,
  MarketTickerProviderContainer as MarketTickerProvider,
};

import { useQueryClient } from "@tanstack/react-query";
import { createContext, memo, useContext, useMemo, useRef } from "react";
import {
  RecentTradeResponseVM,
  useGetExchangeV1PublicTrades,
} from "../../services";
import { selectedSymbolStore } from "../../store";
import { SocketConnection } from "../socketConnection";
import { useDebounceAnimationFrameCallback } from "../useDebounceAnimationFrameCallback";

type TradeItem = {
  /** Event type */
  e: "trade";
  /** Event time */
  E: number;
  /** Symbol */
  s: string;
  /** Trade ID */
  t: number;
  /** Price */
  p: string;
  /** Quantity */
  q: string;
  /** Buyer order ID */
  b: number;
  /** Seller order ID */
  a: number;
  /** Trade time */
  T: number;
  /** Is the buyer the market maker? */
  m: boolean;
  /** Ignore */
  M: boolean;

  S: boolean;
  /** Smart engin enable */
};

interface TickerContextProps {
  trades: RecentTradeResponseVM[] | undefined;
  isTradesLoading: boolean;
}

const TradesBookContext = createContext<TickerContextProps>({
  trades: [],
  isTradesLoading: false,
});

const TradesBookProvider = memo(({ children }: any) => {
  const queryClient = useQueryClient();

  const { selectedSymbol } = selectedSymbolStore.useState();
  const tradeQueryParams = useMemo(
    () => ({
      Symbol: selectedSymbol?.symbol,
      limit: 40,
    }),
    [selectedSymbol],
  );
  const { data: trades, isLoading: isTradesLoading } =
    useGetExchangeV1PublicTrades(tradeQueryParams, {
      enabled: !!selectedSymbol?.symbol,
    });

  const newTradesRef = useRef<Record<string, RecentTradeResponseVM[]>>({});

  const assignToQueryClient = useDebounceAnimationFrameCallback(() => {
    queryClient.setQueriesData<RecentTradeResponseVM[]>(
      useGetExchangeV1PublicTrades.info(tradeQueryParams).key,
      (prev: RecentTradeResponseVM[] | undefined) => {
        const assignableTrades = newTradesRef.current[
          tradeQueryParams.Symbol!
        ]?.filter((trade) => (prev?.[0]?.tradeTime || 0) <= trade.tradeTime!);

        const result = [...(assignableTrades || []), ...(prev || [])].slice(
          0,
          40,
        );

        newTradesRef.current[tradeQueryParams.Symbol!] = [];

        return result;
      },
    );
  }, [queryClient, tradeQueryParams]);

  SocketConnection.useEvent(
    `${selectedSymbol?.symbol.toLowerCase()}@trade`,
    (item: TradeItem) => {
      const tradeItem: RecentTradeResponseVM = {
        orderId: item.a,
        isBestMatch: true,
        buyerIsMaker: item.m,
        price: Number(item.p),
        baseQuantity: Number(item.q),
        quoteQuantity: Number(item.p) * Number(item.q),
        tradeTime: item.T,
        smartTradeEngine: item.S,
      };

      newTradesRef.current[item.s] = [
        tradeItem,
        ...(newTradesRef.current[item.s] || []),
      ];

      assignToQueryClient();
    },
    {
      enabled: !!selectedSymbol?.symbol,
    },
  );

  const value = useMemo(
    () => ({
      trades,
      isTradesLoading,
    }),
    [trades, isTradesLoading],
  );

  return (
    <TradesBookContext.Provider value={value}>
      {children}
    </TradesBookContext.Provider>
  );
});

const useTradesBook = () => {
  const context = useContext(TradesBookContext);
  return context;
};

export { TradesBookProvider, useTradesBook };

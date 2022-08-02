import {
  KlineDataResponseVM,
  KLineInterval,
  useGetExchangeV1PublicKlines,
} from "hitobit-services";
import { isEqual, uniqWith } from "lodash-es";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useQueryClient } from "react-query";
import {
  HapiIntervalToSocket,
  SocketConnection,
  SocketIntervalToHapi,
} from "../socketConnection";

interface KlinesProviderProps {
  children: ReactNode;
}

type KlineInstance = {
  interval: KLineInterval;
  symbol: string;
};

type KlineSubscribe = {
  subscribe: (instance: KlineInstance) => void;
  unsubscribe: (instance: KlineInstance) => void;
};

const KlineContext = createContext<KlineSubscribe>({
  subscribe: () => null,
  unsubscribe: () => null,
});

const Instance = ({ interval, symbol }: KlineInstance) => {
  const queryClient = useQueryClient();

  SocketConnection.useEvent(
    `${symbol?.toLowerCase()}@kline_${[HapiIntervalToSocket[interval]]}`,
    (data) => {
      if (!data) return;

      const newSymbol = data.s; // symbol
      const newInterval = SocketIntervalToHapi[data.k.i];

      const kline: KlineDataResponseVM = {
        openTime: new Date(data.k.t).getTime() as unknown as string, // Kline start time
        closeTime: new Date(data.k.T).getTime() as unknown as string, // Kline close time
        open: data.k.o, // Open price
        close: data.k.c, // Close price
        high: data.k.h, // High price
        low: data.k.l, // Low price
        baseVolume: data.k.v, // Base asset volume
        tradeCount: data.k.n, // Number of trades
        quoteVolume: data.k.q, // Quote asset volume
        takerBuyBaseVolume: data.k.V, // Taker buy base asset volume
        takerBuyQuoteVolume: data.k.Q, // Taker buy quote asset volume
        ignore: data.k.B, // Ignore
      };

      queryClient.setQueryData<KlineDataResponseVM[] | undefined>(
        useGetExchangeV1PublicKlines.info({
          symbol: newSymbol,
          interval: newInterval,
          limit: 200,
        }).key,
        (_prev) => {
          const prev = _prev || [];
          if (
            prev?.[prev?.length - 1]?.openTime &&
            Number(kline.openTime) ===
              new Date(prev[prev?.length - 1].openTime).getTime()
          ) {
            const copy = [...prev];
            copy[copy.length - 1] = kline;
            return copy;
          } else {
            return [...prev, kline].slice(-200);
          }
        },
      );
    },
    {
      enabled: !!symbol,
    },
  );

  return null;
};

const Provider = ({ children }: KlinesProviderProps) => {
  const [klineInstances, setKlineInstances] = useState<KlineInstance[]>([]);

  const subscribe = (instance: KlineInstance) => {
    setKlineInstances((instances) => [...instances, instance]);
  };

  const unsubscribe = (instance: KlineInstance) => {
    const filtered = klineInstances.filter(
      (_instance) => !isEqual(_instance, instance),
    );

    setKlineInstances(filtered);
  };

  const nonDuplicateInstances = uniqWith(klineInstances, isEqual);

  return (
    <KlineContext.Provider value={{ subscribe, unsubscribe }}>
      {nonDuplicateInstances?.map((instance) => (
        <Instance key={instance.symbol} {...instance} />
      ))}
      {children}
    </KlineContext.Provider>
  );
};

function useKlines({ interval, symbol }: KlineInstance) {
  if (typeof KlineContext === "undefined") {
    throw new Error("useKlines hook must be used under the KlinesProvider.");
  }

  const { subscribe, unsubscribe } = useContext(KlineContext);

  useEffect(() => {
    subscribe({ interval, symbol });

    return () => unsubscribe({ interval, symbol });
  }, [interval, subscribe, symbol, unsubscribe]);

  const { data: klines, isLoading: isKlinesLoading } =
    useGetExchangeV1PublicKlines(
      { symbol, interval, limit: 200 },
      {
        cacheTime: 2 * 60 * 1000,
        staleTime: 2 * 60 * 1000,
        enabled: !!symbol,
      },
    );

  return {
    klines,
    isKlinesLoading,
    interval,
    symbol,
  };
}

const kline = {
  Provider,
  useKlines,
};

export { kline };

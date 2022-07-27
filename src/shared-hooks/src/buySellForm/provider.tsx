import { createContext, ReactNode, useContext } from "react";
import { MarketTicker, useMarketTicker } from "../marketTicker";
import { BuySellContext } from "./context";
import { BuySellErrorEnums } from "./enums";

type BuySellErrorTypes = Record<
  BuySellErrorEnums,
  string | ((price?: string) => string)
>;

interface BuySellProviderProps {
  children: ReactNode;
  errors: Partial<BuySellErrorTypes>;
}

type MarketsTickerContextProps = {
  marketsTicker?: MarketTicker[];
  getSymbolMarketTicker: (
    symbol: string | undefined,
  ) => MarketTicker | undefined;
};

export const MarketsTickerContext = createContext<MarketsTickerContextProps>({
  marketsTicker: [],
  getSymbolMarketTicker: () => undefined,
});

export const BuySellErrorContext = createContext<Partial<BuySellErrorTypes>>({
  AMOUNT_LESS_THAN_MIN_PRICE: "",
  AMOUNT_MORE_THAN_MAX_PRICE: "",
  REQUIRED: "",
  INSUFFICIENT_BALANCE: "",
  INSUFFICIENT_BALANCE_FUND: "",
  INVALID_VALUE: "",
  PRICE_LESS_THAN_MIN_PRICE: "",
  PRICE_MORE_THAN_MAX_PRICE: "",
});

const BuySellProvider = ({ children, errors }: BuySellProviderProps) => {
  const { marketsTicker, getSymbolMarketTicker } = useMarketTicker();

  return (
    <MarketsTickerContext.Provider
      value={{ marketsTicker, getSymbolMarketTicker }}
    >
      <BuySellErrorContext.Provider value={errors}>
        <BuySellContext.Provider>{children}</BuySellContext.Provider>
      </BuySellErrorContext.Provider>
    </MarketsTickerContext.Provider>
  );
};

const useMarketsTickerContext = () => useContext(MarketsTickerContext);
const useBuySellErrorContext = () => useContext(BuySellErrorContext);

export { BuySellProvider, useMarketsTickerContext, useBuySellErrorContext };
export type { BuySellErrorTypes };

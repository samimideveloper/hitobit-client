import { createContext, ReactNode, useContext } from "react";
import { Market, useMarkets } from "../useMarkets";
import { ConvertContext } from "./context";
import { ConvertErrorEnums } from "./enums";

type ConvertErrorTypes = Record<
  ConvertErrorEnums,
  string | ((price?: string) => string)
>;

interface ConvertProviderProps {
  children: ReactNode;
  errors: Partial<ConvertErrorTypes>;
}

type AssetMarketContextProps = {
  marketsSymbols?: Market[];
};

export const AssetMarketContext = createContext<AssetMarketContextProps>({
  marketsSymbols: [],
});

export const ErrorContext = createContext<Partial<ConvertErrorTypes>>({
  AMOUNT_LESS_THAN_MIN_PRICE: "",
  AMOUNT_MORE_THAN_MAX_PRICE: "",
  REQUIRED: "",
  INSUFFICIENT_BALANCE: "",
  INSUFFICIENT_BALANCE_FUND: "",
  INVALID_VALUE: "",
  PRICE_LESS_THAN_MIN_PRICE: "",
  PRICE_MORE_THAN_MAX_PRICE: "",
});

const ConvertProvider = ({ children, errors }: ConvertProviderProps) => {
  const { marketsSymbols } = useMarkets();

  return (
    <AssetMarketContext.Provider value={{ marketsSymbols }}>
      <ErrorContext.Provider value={errors}>
        <ConvertContext.Provider>{children}</ConvertContext.Provider>
      </ErrorContext.Provider>
    </AssetMarketContext.Provider>
  );
};

const useAssetMarketContext = () => useContext(AssetMarketContext);
const useErrorContext = () => useContext(ErrorContext);

export { ConvertProvider, useAssetMarketContext, useErrorContext };
export type { ConvertErrorTypes };

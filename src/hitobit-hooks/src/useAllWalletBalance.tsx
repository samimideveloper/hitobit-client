import Decimal from "decimal.js";
import { useMemo } from "react";
import { useAssets } from "./useAssets";
import { useConvertBaseToQuote } from "./useConvertBaseToQuote";
import { useConvertToBaseCurrency } from "./useConvertToBaseCurrency";

const useAllWalletBalance = () => {
  const convertBaseToQuote = useConvertBaseToQuote();
  const { convertToBaseCurrency } = useConvertToBaseCurrency();

  const {
    userAssets,
    error: _error,
    errorUserAsset,
    isLoading,
    refetch,
  } = useAssets();

  const totalBTC = useMemo(
    () =>
      userAssets?.reduce((prev, cur) => {
        const toBTCValue = convertBaseToQuote(
          cur.totalRemain,
          cur.symbol!,
          "BTC",
        );
        return new Decimal(toBTCValue).plus(prev).toNumber();
      }, 0),
    [convertBaseToQuote, userAssets],
  );

  const totalBalanceBaseCurrency = useMemo(
    () => (totalBTC ? convertToBaseCurrency(totalBTC, "BTC") : 0),
    [convertToBaseCurrency, totalBTC],
  );

  return {
    totalBalanceBTC: totalBTC,
    totalBalanceBaseCurrency,
    userAssets,
    isLoading,
    error: _error || errorUserAsset,
    refetch,
  };
};

export { useAllWalletBalance };

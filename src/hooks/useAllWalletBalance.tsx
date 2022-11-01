import Decimal from "decimal.js";
import { useMemo } from "react";
import { useGetPartyV1PrivateDomainSetting } from "../services";
import { baseCurrencyStore } from "../store";
import { useAssets } from "./useAssets";
import { useConvertBaseToQuote } from "./useConvertBaseToQuote";
import { useConvertToBaseCurrency } from "./useConvertToBaseCurrency";

const useAllWalletBalance = () => {
  const convertBaseToQuote = useConvertBaseToQuote();
  const { convertToBaseCurrency } = useConvertToBaseCurrency();
  const { baseCurrency } = baseCurrencyStore.useState();

  const {
    userAssets,
    error: _error,
    errorUserAsset,
    isLoading,
    refetch,
  } = useAssets();

  const { data: domainSetting } = useGetPartyV1PrivateDomainSetting();

  const cryptosInBtc = useMemo(
    () =>
      userAssets
        ?.filter(({ currencyType }) => currencyType === "Crypto")
        .reduce((prev, cur) => {
          const toBTCValue = convertBaseToQuote(
            cur.totalRemain!,
            cur.symbol!,
            domainSetting?.defaultCryptoCurrencySymbol || "BTC",
          );
          return new Decimal(toBTCValue).plus(prev).toNumber();
        }, 0),
    [convertBaseToQuote, domainSetting, userAssets],
  );

  const fiatsInBaseCurrency = useMemo(
    () =>
      userAssets
        ?.filter(({ currencyType }) => currencyType === "Fiat")
        .reduce((prev, cur) => {
          const toBTCValue = convertBaseToQuote(
            cur.totalRemain!,
            cur.symbol!,
            "IRR",
          );

          return new Decimal(toBTCValue).plus(prev).toNumber();
        }, 0) || 0,
    [convertBaseToQuote, userAssets],
  );

  const totalBTC = useMemo(
    () =>
      new Decimal(cryptosInBtc || 0)
        .plus(
          convertBaseToQuote(
            fiatsInBaseCurrency,
            baseCurrency.asset,
            domainSetting?.defaultCryptoCurrencySymbol || "BTC",
          ),
        )
        .toNumber(),
    [
      baseCurrency.asset,
      convertBaseToQuote,
      cryptosInBtc,
      domainSetting,
      fiatsInBaseCurrency,
    ],
  );

  const totalBaseCurrency = useMemo(
    () =>
      new Decimal(fiatsInBaseCurrency || 0)
        .plus(
          convertToBaseCurrency(
            cryptosInBtc || 0,
            domainSetting?.defaultCryptoCurrencySymbol || "BTC",
          ),
        )
        .toNumber(),
    [
      convertToBaseCurrency,
      cryptosInBtc,
      domainSetting?.defaultCryptoCurrencySymbol,
      fiatsInBaseCurrency,
    ],
  );

  return {
    cryptosInBtc,
    fiatsInBaseCurrency,
    totalBTC,
    totalBaseCurrency,
    userAssets,
    isLoading,
    error: _error || errorUserAsset,
    refetch,
  };
};

export { useAllWalletBalance };

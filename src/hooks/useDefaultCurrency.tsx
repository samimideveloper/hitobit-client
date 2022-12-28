import { useGetPartyV1PublicDomainSetting } from "../services";

export const useDefaultCurrency = () => {
  const { data } = useGetPartyV1PublicDomainSetting({
    placeholderData: {
      defaultCryptoCurrencySymbol: "BTC",
      defaultFiatCurrencySymbol: __PRODUCTION__ ? "IRT" : "IRR",
      minimumValueForHideSmallBalance: 1,
    },
  });
  return {
    defaultCurrency:
      data?.defaultFiatCurrencySymbol || (__PRODUCTION__ ? "IRT" : "IRR"),
    defaultCrypto: data?.defaultCryptoCurrencySymbol || "BTC",
    minimumValueForHideSmallBalance: data?.minimumValueForHideSmallBalance || 1,
  };
};

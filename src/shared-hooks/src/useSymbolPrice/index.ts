import Decimal from "decimal.js";
import { useGetExchangeV1PublicKlines } from "shared-services";
import { applyKlineMock } from "shared-utils";

if (__MOCK__) {
  applyKlineMock();
}

const useSymbolPrice = (symbol?: string) => {
  const { data } = useGetExchangeV1PublicKlines(
    {
      symbol: symbol,
      interval: "OneDay",
      limit: 30,
    },
    {
      enabled: !!symbol,
    },
  );

  return {
    price: data?.[0]?.close,
    price24hChangePercent: calculatePercentage(
      data?.[0]?.open,
      data?.[0]?.close,
    ),
    priceWeekChangePercent: calculatePercentage(
      data?.[6]?.open,
      data?.[0]?.close,
    ),
    priceMonthChangePercent: calculatePercentage(
      data?.[29]?.open,
      data?.[0]?.close,
    ),
  };
};

export { useSymbolPrice };

const calculatePercentage = (first?: number, second?: number) => {
  if (first === undefined || second === undefined) {
    return undefined;
  }

  if (first === 0) {
    return second;
  }

  return Number(
    new Decimal(second).minus(first).div(first).mul(100).toFixed(2),
  );
};

import Decimal from "decimal.js";
import starkString from "starkstring";
import { useMarketTicker } from "../marketTicker";
import { useMarketFilters } from "../useMarketFilters";
import { useStepSize } from "../useStepSize";

export const useStepValues = (symbol?: string) => {
  const { toStepSize } = useStepSize(symbol);
  const { getSymbolMarketTicker } = useMarketTicker();
  const selectedMarket = getSymbolMarketTicker(symbol);
  const { maxQuantity, maxNotional } = useMarketFilters({
    selectedMarket,
  });

  const expectedValue = (value?: string | null) =>
    starkString(value || "")
      .parseNumber({ decimal: true })
      .toString();

  const onChangeValue = (_value?: string, isBuy?: boolean) => {
    const _numberedValue = starkString(_value || "")
      .parseNumber({ decimal: true })
      .toNumber();

    if (isBuy && new Decimal(_numberedValue).greaterThan(maxNotional)) {
      return maxNotional;
    }
    if (!isBuy && new Decimal(_numberedValue).greaterThan(maxQuantity)) {
      return maxQuantity;
    }

    const _numberedStepValue = Number(
      toStepSize(
        starkString(_value || "")
          .parseNumber({ decimal: true })
          .toNumber(),
      ),
    );

    const _stepValue = toStepSize(
      starkString(_value || "")
        .parseNumber({ decimal: true })
        .toNumber(),
    );

    return _numberedValue > _numberedStepValue ? _stepValue : _value || "";
  };

  return { expectedValue, onChangeValue };
};

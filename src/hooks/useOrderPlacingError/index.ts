import Decimal from "decimal.js";
import { useTranslation } from "react-i18next";
import { useAuth } from "react-oidc-js";
import starkstring from "starkstring";
import {
  applyMarketMock,
  MarketFilterLotSize,
  MarketFilterMarketLotSize,
  MarketFilterMinNotional,
  MarketFilterPriceFilter,
} from "../../utils";
import { useMarketTicker } from "../marketTicker";
import { useConvertBaseToQuote } from "../useConvertBaseToQuote";

if (__MOCK__) {
  applyMarketMock();
}

// Pass functions to handleValidate of React Hook Form
export function useOrderPlacingError() {
  const { t } = useTranslation();
  const { marketsTicker } = useMarketTicker();
  const convert = useConvertBaseToQuote();
  const { userData } = useAuth();

  const getPriceError = ({
    price,
    symbol,
  }: {
    price?: number;
    symbol?: string;
  }) => {
    if (!price || !symbol) return undefined;
    const targetMarket = marketsTicker?.find((item) => item.name === symbol);

    if (!targetMarket) return undefined;

    const { maxPrice, minPrice = 0 } =
      (targetMarket?.filters?.find(
        (item) => item.filterType === "PRICE_FILTER",
      ) as MarketFilterPriceFilter) || {};

    if (price < minPrice) {
      return t("priceShouldBeMoreThanMinPrice", {
        minPrice: starkstring(minPrice).toCurrency().toString(),
      });
    }
    if (maxPrice !== undefined && price > maxPrice) {
      return t("priceShouldBeLessThanMaxPrice", {
        maxPrice: starkstring(maxPrice).toCurrency().toString(),
      });
    }
    return undefined;
  };

  const getAmountError = ({
    side,
    price: _price,
    symbol,
    baseQuantity: _baseQuantity,
  }: {
    side: "Buy" | "Sell";
    price?: number | string;
    symbol?: string;
    baseQuantity?: number | string;
  }) => {
    if (!symbol || _baseQuantity === undefined || _baseQuantity === "")
      return undefined;

    const targetMarket = marketsTicker?.find(
      (item) => item.symbol?.toLowerCase() === symbol?.toLowerCase(),
    );
    if (!targetMarket) return undefined;

    const baseQuantity = new Decimal(Number(_baseQuantity));
    const price = Number(_price) || targetMarket?.lastPrice;
    const {
      minQty = 0,
      maxQty,
      stepSize,
    } = (targetMarket?.filters?.find(
      (item) => item.filterType === "LOT_SIZE",
    ) as MarketFilterLotSize) || {};

    if (baseQuantity.lessThan(minQty)) {
      return t("valueShouldBeMoreThanMinPrice", {
        minPrice: starkstring(minQty).toCurrency().toString(),
      });
    }
    // if (maxQty !== undefined && baseQuantity.greaterThan(maxQty)) {
    //   return t("valueShouldBeLessThanMaxPrice", {
    //     maxPrice: starkstring(maxQty).toCurrency().toString(),
    //   });
    // }

    const validQty = new Decimal(baseQuantity)
      .toNearest(Number(stepSize), Decimal.ROUND_DOWN)
      .toString();
    // return `baseQuantity ${baseQuantity} validQty ${validQty}`;
    if (validQty !== baseQuantity.toString()) {
      return t("invalidValue");
    }

    if (!__MOCK__ && !userData?.access_token) return undefined;

    if (side === "Buy") {
      const total = new Decimal(price).mul(baseQuantity);
      if (total.greaterThan(targetMarket.quoteCurrency?.availableRemain || 0)) {
        return t("insufficientBalance");
      }
    } else {
      if (
        baseQuantity?.greaterThan(
          targetMarket.baseCurrency?.availableRemain || 0,
        )
      ) {
        return t("insufficientBalance");
      }
    }

    return undefined;
  };

  const getTotalError = ({
    total: _total,
    side,
    symbol,
    price: _price,
  }: {
    total: number | string;
    side: "Buy" | "Sell";
    symbol?: string;
    price?: number | string;
  }) => {
    if (!symbol) return undefined;

    const total = new Decimal(Number(_total));
    const targetMarket = marketsTicker?.find((item) => item.symbol === symbol);

    if (!targetMarket) return undefined;

    const price = new Decimal(Number(_price) || targetMarket?.lastPrice || 0);
    const { maxQty } =
      (targetMarket?.filters?.find(
        (item) => item.filterType === "MARKET_LOT_SIZE",
      ) as MarketFilterMarketLotSize) || {};
    const { minNotional } =
      (targetMarket?.filters?.find(
        (item) => item.filterType === "MIN_NOTIONAL",
      ) as MarketFilterMinNotional) || {};

    if (minNotional !== undefined && total.lessThan(minNotional)) {
      return t("priceShouldBeMoreThanMinPrice", {
        minPrice: starkstring(minNotional).toCurrency().toString(),
      });
    }

    const maxNotional = maxQty
      ? convert(maxQty, targetMarket.baseAsset!, targetMarket.quoteAsset!)
      : undefined;

    if (maxNotional && total.greaterThan(maxNotional)) {
      return t("priceShouldBeLessThanMaxPrice", {
        maxPrice: starkstring(maxNotional).toCurrency().toString(),
      });
    }

    if (!__MOCK__ && !userData?.access_token) return undefined;

    if (side === "Buy") {
      if (
        total.greaterThan(
          Number(targetMarket?.quoteCurrency?.availableRemain || 0),
        )
      ) {
        return t("insufficientBalancePleaseFund");
        // Check if user does not order more than what he/she has
      }

      return undefined;
    } else if (side === "Sell") {
      const calculatedBaseQuantity = new Decimal(total.div(price));
      if (
        calculatedBaseQuantity.greaterThan(
          targetMarket?.baseCurrency?.availableRemain || 0,
        )
      ) {
        return t("insufficientBalance");
      }
      return undefined;
    }
    return undefined;
  };

  return { getTotalError, getPriceError, getAmountError };
}

import {
  MarketResponseVM,
  MarketSymbolResponseVM,
  SymbolFilterType,
} from "shared-services";

export type MarketFilterMinNotional = {
  filterType: "MIN_NOTIONAL";
  minNotional: number;
  applyToMarket: boolean;
  avgPriceMins: number;
};
export type MarketFilterPriceFilter = {
  filterType: "PRICE_FILTER";
  maxPrice: number;
  minPrice: number;
  tickSize: number;
};
export type MarketFilterLotSize = {
  filterType: "LOT_SIZE";
  maxQty: number;
  minQty: number;
  stepSize: number;
};
export type MarketFilterMarketLotSize = {
  filterType: "MARKET_LOT_SIZE";
  maxQty: number;
  minQty: number;
  stepSize: number;
};
export type MarketFilterMaxNumAlgoOrders = {
  filterType: "MAX_NUM_ALGO_ORDERS";
  maxNumAlgoOrders: number;
};
export type MarketFilterMaxNumOrders = {
  filterType: "MAX_NUM_ORDERS";
  maxNumOrders: number;
};

type MarketAllFilters = {
  filterType: SymbolFilterType;
};

export type MarketFilter = MarketAllFilters &
  (
    | MarketFilterMinNotional
    | MarketFilterPriceFilter
    | MarketFilterLotSize
    | MarketFilterMarketLotSize
    | MarketFilterMaxNumAlgoOrders
    | MarketFilterMaxNumOrders
  );

export interface MarketSymbolResponse
  extends Omit<MarketSymbolResponseVM, "filters"> {
  filters: MarketFilter[];
}
export interface MarketResponse extends Omit<MarketResponseVM, "symbols"> {
  symbols: MarketSymbolResponse[];
}

// test type
const marketFilters: MarketFilter = {
  filterType: "MIN_NOTIONAL",
  minNotional: 10,
  applyToMarket: true,
  avgPriceMins: 5,
};

if (marketFilters.filterType === "MIN_NOTIONAL") {
  marketFilters.minNotional;
  //@ts-expect-error
  marketFilters.maxQty;
}

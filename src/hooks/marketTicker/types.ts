type MarketMiniTicker = {
  eventTime: number;
  closePrice: string;
  eventType: string;
  highPrice: string;
  lowPrice: string;
  openPrice: string;
  quoteVolume: string;
  symbol: string;
  volume: string;
  smartTradeEngine: boolean;
  lastMarketInfoChangeDate: string;
};

enum MarketMiniTickerKey {
  e = "eventType",
  E = "eventTime",
  s = "symbol",
  c = "closePrice",
  o = "openPrice",
  h = "highPrice",
  l = "lowPrice",
  v = "volume",
  q = "quoteVolume",
  S = "smartTradeEngine",
  U = "lastMarketInfoChangeDate",
}

const mapMiniTicker = <S extends object>(data: S[]): MarketMiniTicker[] => {
  return data.map((item) => {
    const keys = Object.entries(item);
    const mappedItem = keys.reduce((acc, [key, value]) => {
      acc[MarketMiniTickerKey[key as never]] = value;
      return acc;
    }, {} as never);
    return mappedItem as unknown as MarketMiniTicker;
  });
};

export { mapMiniTicker };

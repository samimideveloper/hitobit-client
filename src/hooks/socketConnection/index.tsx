import { GetExchangeV1PublicKlinesQueryParams } from "../../services";
import { createSocketConnection } from "./createSocketConnection";

export const HapiIntervalToTradingView: Record<
  Exclude<
    GetExchangeV1PublicKlinesQueryParams["interval"],
    | undefined
    | "ThreeMinutes"
    | "TwoHour"
    | "SixHour"
    | "EightHour"
    | "TwelveHour"
    | "ThreeDay"
  >,
  string
> = {
  OneMinute: "1",
  FiveMinutes: "5",
  FifteenMinutes: "15",
  ThirtyMinutes: "30",
  OneHour: "60",
  FourHour: "240",
  OneDay: "1D",
  OneWeek: "1W",
  OneMonth: "1M",
};

export const HapiIntervalToSocket: Record<
  Exclude<GetExchangeV1PublicKlinesQueryParams["interval"], undefined>,
  string
> = {
  OneMinute: "1m",
  FiveMinutes: "5m",
  FifteenMinutes: "15m",
  ThirtyMinutes: "30m",
  OneHour: "1h",
  OneDay: "1d",
  OneWeek: "1w",
  OneMonth: "1M",
  EightHour: "8h",
  FourHour: "4h",
  SixHour: "6h",
  ThreeDay: "3d",
  ThreeMinutes: "3m",
  TwelveHour: "12h",
  TwoHour: "2h",
};

export const SocketIntervalToHapi: Record<
  string,
  Exclude<GetExchangeV1PublicKlinesQueryParams["interval"], undefined>
> = Object.fromEntries(
  Object.entries(HapiIntervalToSocket).map(([key, value]) => [
    value,
    key as Exclude<GetExchangeV1PublicKlinesQueryParams["interval"], undefined>,
  ]),
);

export type BInterval = string;

const SocketConnection = createSocketConnection<
  | `${string}@kline_${BInterval}`
  | `${string}@depth`
  | `${string}@trade`
  | "!miniTicker@arr"
>(["!miniTicker@arr"]);

export { SocketConnection, createSocketConnection };

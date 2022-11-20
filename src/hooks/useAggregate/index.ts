import { Decimal } from "decimal.js";
import { groupBy, map, maxBy } from "lodash-es";
import { useOrdersBook } from "../ordersBook";

interface Props {
  // asksBids: (readonly [number, number])[];
  selectedAggregate: number;
  length?: number;
}

export function useAggregate({ selectedAggregate, length = 40 }: Props) {
  const { asks, bids, isLoading } = useOrdersBook();

  const _asks = aggregate(asks, selectedAggregate);
  const _bids = aggregate(bids, selectedAggregate);

  const last24Asks = _asks
    .sort(([priceA], [priceB]) => priceB - priceA)
    .slice(-length);

  const maximumAsk = maxBy(
    last24Asks,
    (item) => Number(item[0]) * Number(item[1]),
  ) || [0, 0];

  const last24Bids = _bids
    .sort(([priceA], [priceB]) => priceB - priceA)
    .slice(0, length);

  const maximumBid = maxBy(
    last24Bids,
    (item) => Number(item[0]) * Number(item[1]),
  ) || [0, 0];

  return { last24Asks, maximumAsk, last24Bids, maximumBid, isLoading };
}

function aggregate(
  asksBids: (readonly [number, number])[],
  selectedAggregate: number,
) {
  return map(
    groupBy(asksBids, (item) =>
      new Decimal(item[0]).toNearest(selectedAggregate, Decimal.ROUND_DOWN),
    ),
    (items, key) =>
      [Number(key), sumBy(items, ([, amount]) => amount)] as const,
  );
}

function sumBy<T>(items: readonly T[], fn: (item: T) => number) {
  return items.reduce(
    (acc, item) => new Decimal(acc).plus(fn(item)).toNumber(),
    0,
  );
}

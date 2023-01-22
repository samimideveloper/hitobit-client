import { useQuery, useQueryClient } from "@tanstack/react-query";
import Decimal from "decimal.js";
import moment from "moment";
import { useCallback, useRef } from "react";
import { i18n } from "../../modules";
import {
  AppOrderSide,
  AppOrderStatus,
  AppOrderType,
  AppTimeInForce,
  getExchangeV1PublicMarkets,
  OrderResultInfoResponseVM,
  useGetExchangeV1PrivateOpenorders,
} from "../../services";
import { selectedSymbolStore } from "../../store";
import { MarketFilterPriceFilter } from "../../utils";
import { NotificationArgsProps, useNotification } from "../notification";
import { useDebounceAnimationFrameCallback } from "../useDebounceAnimationFrameCallback";
import { useUserSignalREvent } from "./useUserSignalREvent";

interface UserAssetSignal {
  eventType: "executionReport"; // Event type
  eventTime: number; // Event time
  symbol: string; // Symbol
  clientOrderID: string; // Client order ID
  side: AppOrderSide; // Side
  orderType: AppOrderType; // Order type
  timeInForce: AppTimeInForce; // Time in force
  orderQuantity: string; // Order quantity
  orderPrice: string; // Order price
  stopPrice: string; // Stop price
  icebergQuantity: string; // Iceberg quantity
  orderListId: number; // OrderListId
  originalClientOrderID: ""; // Original client order ID; This is the ID of the order being canceled
  currentExecutionType: "NEW"; // Current execution type
  currentOrderStatus: AppOrderStatus; // Current order status
  orderRejectReason: "NONE"; // Order reject reason; will be an error code.
  orderID: number; // Order ID
  lastExecutedQuantity: string; // Last executed quantity
  cumulativeFilledQuantity: string; // Cumulative filled quantity
  lastExecutedPrice: string; // Last executed price
  commissionAmount: string; // Commission amount
  commissionAsset: null; // Commission asset
  transactionTime: number; // Transaction time
  tradeID: number; // Trade ID
  ignore: number; // Ignore
  isTheOrderOnTheBook: boolean; // Is the order on the book?
  isThisTradeTheMakerSide: boolean; // Is this trade the maker side?
  isIgnore: boolean; // Ignore
  orderCreationTime: number; // Order creation time
  cumulativeQuoteAssetTransactedQuantity: string; // Cumulative quote asset transacted quantity
  lastQuoteAssetTransactedQuantity: string; // Last quote asset transacted quantity (i.e. lastPrice * lastQty)
  quoteOrderQty: string; // Quote Order Qty
}

const userAssetSignalSynonym: Record<string, keyof UserAssetSignal> = {
  e: "eventType", // Event type
  s: "symbol", // Symbol
  S: "side", // Side, 1 for Buy; 2 for Sell
  o: "orderType", // Order type, 2 for LIMIT (only)
  f: "timeInForce", // Time in force,  1 for Good Till Expire (GTE); 3 for Immediate Or Cancel (IOC)
  q: "orderQuantity", // Order quantity
  p: "orderPrice", // Order price
  x: "currentExecutionType", // Current execution type
  X: "currentOrderStatus", // Current order status, possible values Ack, Canceled, Expired, IocNoFill, PartialFill, FullyFill, FailedBlocking, FailedMatching, Unknown
  i: "orderID", // Order ID
  l: "lastExecutedQuantity", // Last executed quantity
  z: "cumulativeFilledQuantity", // Cumulative filled quantity
  L: "lastExecutedPrice", // Last executed price
  n: "commissionAmount", // Commission amount for all user trades within a given block. Fees will be displayed with each order but will be charged once.
  // Fee can be composed of a single symbol, ex: "10000BNB"
  // or multiple symbols if the available "BNB" balance is not enough to cover the whole fees, ex: "1.00000000BNB;0.00001000BTC;0.00050000ETH"
  T: "transactionTime", // Transaction time
  t: "tradeID", // Trade ID
  O: "orderCreationTime", // Order creation time

  c: "clientOrderID", // Client order ID
  P: "stopPrice", // Stop price
  F: "icebergQuantity", // Iceberg quantity
  g: "orderListId", // OrderListId
  C: "originalClientOrderID", // Original client order ID; This is the ID of the order being canceled
  r: "orderRejectReason", // Order reject reason; will be an error code.
  N: "commissionAsset", // Commission asset
  I: "ignore", // Ignore
  w: "isTheOrderOnTheBook", // Is the order on the book?
  m: "isThisTradeTheMakerSide", // Is this trade the maker side?
  M: "isIgnore", // Ignore
  Z: "cumulativeQuoteAssetTransactedQuantity", // Cumulative quote asset transacted quantity
  Y: "lastQuoteAssetTransactedQuantity", // Last quote asset transacted quantity (i.e. lastPrice * lastQty)
  Q: "quoteOrderQty", // Quote Order Qty
};

const useUpdateOrderWithSignalr = () => {
  const queryClient = useQueryClient();
  const { selectedSymbol } = selectedSymbolStore.useState();
  const { successNotification } = useNotification();

  const newOrdersRef = useRef<UserAssetSignal[]>([]);

  const { data } = useQuery(
    ["useUpdateOrderWithSignalr"],
    async () => {
      const data = await getExchangeV1PublicMarkets();

      return data;
    },
    {
      cacheTime: Infinity,
      staleTime: Infinity,
    },
  );

  const toTickSize = useCallback(
    (value: number | Decimal | string, passedSymbol?: string) => {
      const filters = data?.symbols?.find(
        ({ name }) => name === passedSymbol,
      )?.filters;

      const tickSize = (
        filters?.find(
          ({ filterType }) => filterType === "PRICE_FILTER",
        ) as MarketFilterPriceFilter
      )?.tickSize;

      if (tickSize !== undefined && value !== "") {
        return new Decimal(value)
          .div(tickSize)
          .floor()
          .mul(tickSize)
          .toString();
      }
      return value.toString();
    },
    [data],
  );

  const assignToQueryClient = useDebounceAnimationFrameCallback(() => {
    const stackedOrders = [...newOrdersRef.current];
    newOrdersRef.current = [];
    queryClient.setQueriesData<OrderResultInfoResponseVM[]>(
      useGetExchangeV1PrivateOpenorders.info({}).key,
      (queryData) => {
        let prev = queryData || [];
        stackedOrders.forEach((order) => {
          const quotePrice = new Decimal(order.orderPrice).mul(
            order.orderQuantity,
          );

          const _origQuoteOrderQty = toTickSize(quotePrice, order.symbol);

          const origQuoteOrderQty = _origQuoteOrderQty
            ? Number(_origQuoteOrderQty)
            : 0;

          prev =
            updateOrders(prev, order, origQuoteOrderQty, successNotification) ||
            prev;
        });

        return [...prev];
      },
    );
  }, [queryClient, selectedSymbol]);

  useUserSignalREvent("executionReport", (data) => {
    const order = mapObjectToSynonyms<UserAssetSignal>(
      data,
      userAssetSignalSynonym,
    );

    newOrdersRef.current.push(order);

    // performance
    // This is to update the queryClient after the animation frame
    assignToQueryClient();
  });
};

function mapObjectToSynonyms<T>(data: object, synonym: any): T {
  return Object.entries(data).reduce((prev, [key, value]) => {
    const eventKey = synonym[key];

    return {
      ...prev,
      [eventKey]: value,
    };
  }, {} as T);
}

const updateOrders = (
  prev: OrderResultInfoResponseVM[],
  order: UserAssetSignal,
  origQuoteOrderQty: number,
  successNotification: (notification: NotificationArgsProps) => void,
): OrderResultInfoResponseVM[] => {
  const newOrder: OrderResultInfoResponseVM = {
    orderId: order.orderID,
    status: order.currentOrderStatus,
    type: order.orderType,
    side: order.side,
    symbol: order.symbol,
    timeInForce: order.timeInForce,
    origQty: order.orderQuantity ? Number(order.orderQuantity) : undefined,
    price: order.orderPrice ? Number(order.orderPrice) : undefined,
    orderListId: order.orderListId,
    stopPrice: order.stopPrice ? Number(order.stopPrice) : undefined,
    clientOrderId: order.clientOrderID,
    executedQty: Number(order.cumulativeFilledQuantity),
    origQuoteOrderQty: origQuoteOrderQty,
    transactTime: moment(order.transactionTime).local().toDate().getTime(),
    cummulativeQuoteQty: Number(order.cumulativeQuoteAssetTransactedQuantity),
  };

  switch (order.currentOrderStatus) {
    case "NEW": {
      return [
        newOrder,
        ...prev.filter((item) => item.orderId !== newOrder.orderId),
      ];
    }

    case "CANCELED":
    case "REJECTED":
    case "EXPIRED":
    case "FILLED": {
      if (order.currentOrderStatus === "FILLED") {
        successNotification({
          message: i18n.t("orderSuccessfullyFilled") as string,
        });
      }

      return [...prev.filter((o) => o.orderId !== newOrder.orderId)];
    }

    case "PARTIALLY_FILLED": {
      const index = prev.findIndex((o) => o.orderId === newOrder.orderId);

      if (index !== undefined && index !== -1) {
        prev[index] = newOrder;
        return [...prev];
      }
      return [newOrder, ...prev];
    }
    case "PENDING_CANCEL":
    case "NEW_ADL":
    case "NEW_INSURANCE": {
      return prev;
    }
  }
};

export { useUpdateOrderWithSignalr };

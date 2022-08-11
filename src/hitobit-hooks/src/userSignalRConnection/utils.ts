import {
  BalanceUpdateModel,
  OutboundAccountPositionModel,
} from "./useUserSignalREvent";

export const REFRESH_SIGNAL_MS = 30 * 60 * 1000;

interface Balance {
  walletNumber: string; //w
  asset: string; //a
  free: string; //f
  locked: string; //l
}
export interface OutboundAccountPosition {
  eventType: "outboundAccountPosition"; //e
  eventTime: number; //E
  lastAccountUpdate: number; //u
  balances: Balance[];
}

export interface BalanceUpdate {
  eventType: "balanceUpdate"; //e
  eventTime: number; //E
  asset: string; //a
  balanceDelta: string; //d
  clearTime: number; //T
  walletNumber: string; //w
}

const convertOutboundAccountPositionSocketToHumanize = (
  data: OutboundAccountPositionModel,
): OutboundAccountPosition => ({
  eventType: data.e,
  eventTime: data.E,
  lastAccountUpdate: data.u,
  balances: data.B.map((b) => ({
    walletNumber: b.w,
    asset: b.a,
    free: b.f,
    locked: b.l,
  })),
});
const convertBalanceUpdateToHumanize = (
  data: BalanceUpdateModel,
): BalanceUpdate => ({
  eventType: data.e,
  eventTime: data.E,
  clearTime: data.T,
  balanceDelta: data.d,
  asset: data.a,
  walletNumber: data.w,
});

export {
  convertOutboundAccountPositionSocketToHumanize,
  convertBalanceUpdateToHumanize,
};

import {
  getWalletV1PrivateUserassetSpotDefaultAll,
  useGetWalletV1PrivateUserassetSpotDefault,
  UserAssetResponseVM,
} from "hitobit-services";
import { useRef } from "react";
import { useQueryClient } from "react-query";
import { useDebounceAnimationFrameCallback } from "../useDebounceAnimationFrameCallback";
import { useUserSignalREvent } from "./event";

interface Balance {
  walletNumber: string; //w
  asset: string; //a
  free: string; //f
  locked: string; //l
}
interface OutboundAccountPosition {
  eventType: "outboundAccountPosition"; //e
  eventTime: number; //E
  lastAccountUpdate: number; //u
  balances: Balance[];
}

interface OutboundAccountPositionSocket {
  e: "outboundAccountPosition"; //Event type
  E: number; //Event Time
  u: number; //Time of last account update
  B: [
    //Balances Array
    {
      w: string; //Wallet number
      a: string; //Asset
      f: string; //Free
      l: string; //Locked
    },
  ];
}

interface BalanceUpdate {
  eventType: "balanceUpdate"; //e
  eventTime: number; //E
  asset: string; //a
  balanceDelta: string; //d
  clearTime: number; //T
  walletNumber: string; //w
}
interface BalanceUpdateSocket {
  e: "balanceUpdate"; //Event Type
  E: number; //Event Time
  a: string; //Asset
  d: string; //Balance Delta
  T: number; //Clear Time
  w: string; //Wallet number
}

const useUpdateUserAssetWithSignalr = () => {
  const queryClient = useQueryClient();

  const newOutboundRef = useRef<OutboundAccountPosition[]>([]);

  const assignToQueryClientOutbound = useDebounceAnimationFrameCallback(() => {
    const stackedOutbound = [...newOutboundRef.current];
    newOutboundRef.current = [];

    queryClient.setQueryData<UserAssetResponseVM[]>(
      [getWalletV1PrivateUserassetSpotDefaultAll.key],
      (prev) => {
        const newAssets = [...(prev || [])];

        stackedOutbound.forEach((outbound) => {
          outbound.balances.forEach((item) => {
            const index = prev?.findIndex(
              (x) => x.walletNumber === item.walletNumber,
            );

            if (index !== undefined && index !== -1) {
              newAssets[index] = {
                ...newAssets[index],
                availableRemain: Number(item.free),
                totalRemain: Number(item.free) + Number(item.locked),
              };

              return;
            }

            newAssets.push({
              walletName: item.walletNumber,
              walletNumber: item.walletNumber,
              inUseRemain: Number(item.locked),
              symbol: item.asset,
              availableRemain: Number(item.free),
              totalRemain: Number(item.free) + Number(item.locked),
            });

            queryClient.invalidateQueries<UserAssetResponseVM>(
              useGetWalletV1PrivateUserassetSpotDefault.info({
                symbol: item.asset,
              }).key,
            );
          });
        });

        return newAssets;
      },
    );
  }, []);

  useUserSignalREvent(
    "outboundAccountPosition",
    (data: OutboundAccountPositionSocket) => {
      const updated = convertOutboundAccountPositionSocketToHumanize(data);

      newOutboundRef.current.push(updated);

      assignToQueryClientOutbound();
    },
  );

  const newBalanceRef = useRef<BalanceUpdate[]>([]);

  const assignToQueryClientBalance = useDebounceAnimationFrameCallback(() => {
    const stackedBalance = [...newBalanceRef.current];
    newBalanceRef.current = [];

    queryClient.setQueryData<UserAssetResponseVM[]>(
      [getWalletV1PrivateUserassetSpotDefaultAll.key],
      (prev) => {
        const newAssets: UserAssetResponseVM[] = [...(prev || [])];

        stackedBalance.forEach((balance) => {
          const index = prev?.findIndex((x) => x.symbol === balance.asset);

          if (index !== undefined && index !== -1) {
            newAssets[index] = {
              ...newAssets[index],
              availableRemain:
                (newAssets[index]?.availableRemain || 0) +
                Number(balance.balanceDelta),
              totalRemain:
                (newAssets[index]?.totalRemain || 0) +
                Number(balance.balanceDelta),
            };
          } else {
            newAssets.push({
              walletName: balance.walletNumber,
              inUseRemain: 0,
              walletNumber: balance.walletNumber,
              symbol: balance.asset,
              availableRemain: Number(balance.balanceDelta),
              totalRemain: Number(balance.balanceDelta),
            });
          }

          queryClient.invalidateQueries<UserAssetResponseVM>(
            useGetWalletV1PrivateUserassetSpotDefault.info({
              symbol: balance.asset,
            }).key,
          );
        });

        return newAssets;
      },
    );
  }, []);

  useUserSignalREvent("balanceUpdate", (data: BalanceUpdateSocket) => {
    const updated = convertBalanceUpdateToHumanize(data);

    newBalanceRef.current.push(updated);

    assignToQueryClientBalance();
  });
};

const convertOutboundAccountPositionSocketToHumanize = (
  data: OutboundAccountPositionSocket,
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
  data: BalanceUpdateSocket,
): BalanceUpdate => ({
  eventType: data.e,
  eventTime: data.E,
  clearTime: data.T,
  balanceDelta: data.d,
  asset: data.a,
  walletNumber: data.w,
});

export { useUpdateUserAssetWithSignalr };

import { useQueryClient } from "@tanstack/react-query";
import { useRef } from "react";
import { useDebounceAnimationFrameCallback } from "reactjs-view-core";
import {
  getWalletV1PrivateAll,
  UserWalletDisplayResponseVM,
} from "../../services";
import { useUserSignalREvent } from "./useUserSignalREvent";
import {
  BalanceUpdate,
  convertBalanceUpdateToHumanize,
  convertOutboundAccountPositionSocketToHumanize,
  OutboundAccountPosition,
} from "./utils";

const useUpdateUserWalletWithSignalr = () => {
  const queryClient = useQueryClient();

  const newOutboundRef = useRef<OutboundAccountPosition[]>([]);

  const assignToQueryClientOutbound = useDebounceAnimationFrameCallback(() => {
    const stackedOutbound = [...newOutboundRef.current];
    newOutboundRef.current = [];

    queryClient.setQueryData<UserWalletDisplayResponseVM[]>(
      [getWalletV1PrivateAll.key],
      (prev) => {
        const newAssets = [...(prev || [])];

        stackedOutbound.forEach((outbound) => {
          outbound.balances.forEach((item) => {
            const index = prev?.findIndex(
              (x) => x.number === item.walletNumber,
            );

            if (index !== undefined && index !== -1) {
              newAssets[index] = {
                ...newAssets[index],
                inUseRemain: Number(
                  item.locked ?? newAssets[index].inUseRemain,
                ),
                availableRemain: Number(item.free),
                totalRemain: Number(item.free) + Number(item.locked),
              };

              return;
            }

            newAssets.push({
              name: item.walletNumber,
              number: item.walletNumber,
              inUseRemain: Number(item.locked),
              symbol: item.asset,
              availableRemain: Number(item.free),
              totalRemain: Number(item.free) + Number(item.locked),
              getComissionFromPayer: false,
              automaticSettlement: false,
              accountStatus: "OK",
              isActive: true,
              relatedUserWalletIndex: 0,
              userWalletType: "Spot",
            });
          });
        });

        return newAssets;
      },
    );
  });

  useUserSignalREvent("outboundAccountPosition", (data) => {
    const updated = convertOutboundAccountPositionSocketToHumanize(data);

    newOutboundRef.current.push(updated);

    assignToQueryClientOutbound();
  });

  const newBalanceRef = useRef<BalanceUpdate[]>([]);

  const assignToQueryClientBalance = useDebounceAnimationFrameCallback(() => {
    const stackedBalance = [...newBalanceRef.current];
    newBalanceRef.current = [];

    queryClient.setQueryData<UserWalletDisplayResponseVM[]>(
      [getWalletV1PrivateAll.key],
      (prev) => {
        const newAssets: UserWalletDisplayResponseVM[] = [...(prev || [])];

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
              name: balance.walletNumber,
              inUseRemain: 0,
              number: balance.walletNumber,
              symbol: balance.asset,
              availableRemain: Number(balance.balanceDelta),
              totalRemain: Number(balance.balanceDelta),
              getComissionFromPayer: false,
              automaticSettlement: false,
              accountStatus: "OK",
              isActive: true,
              relatedUserWalletIndex: 0,
              userWalletType: "Spot",
            });
          }
        });

        return newAssets;
      },
    );
  });

  useUserSignalREvent("balanceUpdate", (data) => {
    const updated = convertBalanceUpdateToHumanize(data);

    newBalanceRef.current.push(updated);

    assignToQueryClientBalance();
  });
};

export { useUpdateUserWalletWithSignalr };

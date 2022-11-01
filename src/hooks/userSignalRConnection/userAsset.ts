import { useQueryClient } from "@tanstack/react-query";
import { useRef } from "react";
import {
  getWalletV1PrivateUserassetSpotDefault,
  getWalletV1PrivateUserassetSpotDefaultAll,
  useGetWalletV1PrivateUserassetSpotDefault,
  UserAssetResponseVM,
} from "../../services";
import { useDebounceAnimationFrameCallback } from "../useDebounceAnimationFrameCallback";
import { useUserSignalREvent } from "./useUserSignalREvent";
import {
  BalanceUpdate,
  convertBalanceUpdateToHumanize,
  convertOutboundAccountPositionSocketToHumanize,
  OutboundAccountPosition,
} from "./utils";

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

            queryClient.invalidateQueries({
              queryKey: [getWalletV1PrivateUserassetSpotDefault.key],
              refetchType: "all",
              exact: true,
            });
          });
        });

        return newAssets;
      },
    );
  }, []);

  useUserSignalREvent("outboundAccountPosition", (data) => {
    const updated = convertOutboundAccountPositionSocketToHumanize(data);

    newOutboundRef.current.push(updated);

    assignToQueryClientOutbound();
  });

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

  useUserSignalREvent("balanceUpdate", (data) => {
    const updated = convertBalanceUpdateToHumanize(data);

    newBalanceRef.current.push(updated);

    assignToQueryClientBalance();
  });
};

export { useUpdateUserAssetWithSignalr };

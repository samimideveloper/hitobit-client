import { groupBy, map } from "lodash-es";
import { useCallback, useEffect, useMemo, useRef } from "react";
import { useAuth } from "react-oidc-js";
import {
  CurrencyResponseVM,
  RequestError,
  useGetCapitalV1PublicCurrencyAll,
  useGetWalletV1PrivateUserassetSpotDefaultAll,
  UserAssetResponseVM,
} from "shared-services";

export type Asset = UserAssetResponseVM & CurrencyResponseVM;

const useAssets = ({
  onSuccess,
  onError,
}: {
  onSuccess?: (data: Asset[]) => void;
  onError?: (error?: RequestError | Error | null) => void;
} = {}) => {
  const { userData } = useAuth();

  const {
    data: privateUserAssets,
    isLoading: isLoadingUserAsset,
    error: errorUserAsset,
    remove: removeUserAssets,
    refetch: refetchUserAssets,
  } = useGetWalletV1PrivateUserassetSpotDefaultAll({
    enabled: __MOCK__ || !!userData?.access_token,
    onError: (e) => onError?.(e),
  });

  const {
    data: assets,
    isLoading: isAssetLoading,
    error: errorAssets,
    remove: removeAssets,
    refetch: refetchAssets,
  } = useGetCapitalV1PublicCurrencyAll({
    cacheTime: Infinity,
    staleTime: Infinity,
    onError: (e) => onError?.(e),
  });

  const refetch = () => {
    refetchUserAssets();
    refetchAssets();
  };

  const { allAssets, userAssets } = useMemo<{
    allAssets: Asset[] | undefined;
    userAssets: Asset[] | undefined;
  }>(() => {
    const groupedUserAssets = groupBy(privateUserAssets, (coin) => coin.symbol);
    const groupedAssets = groupBy(assets, (coin) => coin.symbol);

    return {
      allAssets: assets
        ? map(groupedAssets, (asset) => {
            const userAsset = groupedUserAssets[asset[0].symbol!];

            return {
              ...asset[0],
              ...userAsset?.[0],
            };
          })
        : undefined,
      userAssets: privateUserAssets
        ? map(groupedUserAssets, (asset) => {
            const userAsset = groupedAssets[asset[0].symbol!];

            return {
              ...asset[0],
              ...userAsset?.[0],
            };
          })
        : undefined,
    };
  }, [assets, privateUserAssets]);

  const isOnSuccessCalled = useRef(false);
  const isOnErrorCalled = useRef(false);

  useEffect(() => {
    if (!allAssets) return;

    if (onSuccess && !isOnSuccessCalled.current) {
      isOnSuccessCalled.current = true;

      onSuccess(allAssets);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allAssets]);

  useEffect(() => {
    if (errorAssets || errorUserAsset) {
      if (onError && !isOnErrorCalled.current) {
        isOnErrorCalled.current = true;
        onError?.(errorAssets || errorUserAsset);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errorAssets, errorUserAsset]);

  const remove = useCallback(() => {
    removeUserAssets();
    removeAssets();
  }, [removeAssets, removeUserAssets]);

  return {
    allAssets,
    userAssets,
    errorUserAsset,
    remove,
    isLoading: isAssetLoading || isLoadingUserAsset,
    error: errorUserAsset || errorAssets,
    refetch,
  };
};

export { useAssets };

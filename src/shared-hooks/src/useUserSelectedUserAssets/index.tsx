import { useAuth } from "react-oidc-js";
import { useGetWalletV1PrivateUserassetSpotDefaultAll } from "shared-services";
import { selectedSymbolStore } from "shared-store";

const useUserSelectedUserAssets = () => {
  const { selectedSymbol } = selectedSymbolStore.useState();
  const { userData } = useAuth();

  const { data: userAssets } = useGetWalletV1PrivateUserassetSpotDefaultAll({
    cacheTime: Infinity,
    staleTime: Infinity,
    enabled: !!userData?.access_token,
  });

  const userQuoteAsset = userAssets?.find(
    (asset) => asset.symbol === selectedSymbol?.quoteAsset,
  );

  const userBaseAsset = userAssets?.find(
    (asset) => asset.symbol === selectedSymbol?.baseAsset,
  );

  const quoteAvailableRemain = userQuoteAsset?.availableRemain || 0;
  const baseAvailableRemain = userBaseAsset?.availableRemain || 0;

  return {
    quoteAvailableRemain,
    baseAvailableRemain,
  };
};

export { useUserSelectedUserAssets };

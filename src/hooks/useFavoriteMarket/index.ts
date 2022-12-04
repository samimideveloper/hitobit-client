import { useTranslation } from "react-i18next";
import { useAuth } from "react-oidc-js";
import {
  useDeletePartyV1PrivateFavoritemarket,
  useGetPartyV1PrivateFavoritemarket,
  usePostPartyV1PrivateFavoritemarket,
} from "../../services";
import { useNotification } from "../notification";

type UseFavoriteArguments = {
  onSuccess?: () => void;
  onFail?: () => void;
};

export const useFavoriteMarket = ({
  onFail,
  onSuccess,
}: UseFavoriteArguments) => {
  const { userData } = useAuth();

  const { t } = useTranslation();
  const { successNotification, errorNotification } = useNotification();
  const { data, isLoading, refetch } = useGetPartyV1PrivateFavoritemarket(
    {
      marketType: "Spot",
    },
    {
      enabled: !!userData?.access_token,
    },
  );

  const { mutate: addToFavorites } = usePostPartyV1PrivateFavoritemarket({
    onSuccess: () => {
      successNotification({
        message: t("addFavoriteSuccessMessage"),
      });
      onSuccess?.();
      refetch();
    },
    onError: () => {
      errorNotification({
        message: t("errorWhileAddingToFavoriteMessage"),
      });
    },
  });
  const { mutate: deleteFavorite } = useDeletePartyV1PrivateFavoritemarket({
    onSuccess: () => {
      successNotification({
        message: t("removeFromFavoriteSuccessMessage"),
      });
      onSuccess?.();

      refetch();
    },
    onError: () => {
      errorNotification({
        message: t("errorWhileRemovingFromFavoriteMessage"),
      });
    },
  });

  const onToggleFavorite = (symbol?: string[]) => {
    if (!symbol) return;

    if (!userData?.access_token) {
      onFail?.();
      return;
    }
    const marketSymbols = data?.filter((c) => symbol.some((s) => s === c));

    if (marketSymbols && marketSymbols?.length > 0) {
      deleteFavorite({
        requestBody:
          marketSymbols?.map((s) => ({
            marketSymbol: s,
            marketType: "Spot",
          })) || [],
      });
      return;
    }
    addToFavorites({
      requestBody: symbol.map((symbol) => ({
        marketSymbol: symbol,
        marketType: "Spot",
      })),
    });
  };

  const isSymbolFavorite = (symbol?: string[]) => {
    return !!data?.find((c) => symbol?.some((s) => s === c));
  };

  return {
    favoritesMarket: data,
    isFavoritesLoading: isLoading,
    onToggleFavorite,
    isSymbolFavorite,
  };
};

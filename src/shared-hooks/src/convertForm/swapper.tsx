import { Fragment, ReactNode, useMemo } from "react";
import { useAssets } from "../useAssets";
import { useMatchedMarketsList } from "../useMatchedMarketsList";
import { ConvertContext } from "./context";
import { useAssetMarketContext } from "./provider";

type SwapRenderProps = {
  canSwap: boolean | undefined;
  onSwap: () => void;
};

interface ConvertSwapperProps {
  render: (props: SwapRenderProps) => ReactNode;
}

export const ConvertSwapper = ({ render }: ConvertSwapperProps) => {
  const { fromAsset, toMarket } = ConvertContext.useWatch();
  const { clearErrors, setValue } = ConvertContext.useFormContext();

  const { allAssets } = useAssets();

  const { selectedMarket, isFromSelectedBaseAsset } = useMatchedMarketsList({
    fromAsset,
    toMarket,
  });

  const { marketsSymbols } = useAssetMarketContext();

  const availableSymbols = marketsSymbols?.filter(
    (item) => fromAsset === item.baseAsset || fromAsset === item.quoteAsset,
  );

  const _fromAsset = useMemo(() => {
    return allAssets?.find(({ symbol }) =>
      isFromSelectedBaseAsset
        ? symbol?.toLowerCase() === selectedMarket?.quoteAsset?.toLowerCase()
        : symbol?.toLowerCase() === selectedMarket?.baseAsset?.toLowerCase(),
    );
  }, [
    allAssets,
    isFromSelectedBaseAsset,
    selectedMarket?.baseAsset,
    selectedMarket?.quoteAsset,
  ]);

  const canSwap = _fromAsset && _fromAsset.canTrade;

  const onSwap = () => {
    clearErrors();
    if (!_fromAsset || !_fromAsset.canTrade) return;

    const _toAsset = availableSymbols?.find(
      ({ name }) => selectedMarket?.name === name,
    );
    setValue("fromAsset", _fromAsset?.symbol);
    setValue("toMarket", _toAsset?.name);
    setValue("fromAmount", null);
    setValue("toAmount", null);
  };

  return <Fragment>{render({ onSwap, canSwap })}</Fragment>;
};

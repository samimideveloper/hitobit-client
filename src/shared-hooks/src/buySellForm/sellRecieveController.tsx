import React, { ReactNode } from "react";
import { ControllerRenderProps } from "react-hook-form";
import { MarketTicker, useMarketTicker } from "../marketTicker";
import { useMarketFilters } from "../useMarketFilters";
import { useOrderPlacingError } from "../useOrderPlacingError";
import { BuySellContext, BuySellFormProps } from "./context";

type SellRecieveRenderProps = {
  render: (state: {
    field: ControllerRenderProps<BuySellFormProps, "recieve"> & {
      assets: MarketTicker[];
      asset?: MarketTicker;
      minQuantity: number;
      maxQuantity: number;
      hasError?: boolean;
      availableRemain: number;
      onSelect?: (value?: MarketTicker | undefined) => void;
    };
  }) => React.ReactElement;

  renderErrorComponent?: (message?: string) => ReactNode;
};

export const SellRecieveController = ({
  render,
  renderErrorComponent,
}: SellRecieveRenderProps) => {
  const { lastChangeInput, selected, spend } = BuySellContext.useWatch();

  const { errors } = BuySellContext.useFormState();

  const { setValue, clearErrors } = BuySellContext.useFormContext();

  const { getTotalError } = useOrderPlacingError();

  const { marketsTicker, getSymbolMarketTicker } = useMarketTicker();

  const selectedMarket = getSymbolMarketTicker(selected);

  const { minNotional, maxNotional } = useMarketFilters({ selectedMarket });

  const availableRemain = selectedMarket?.quoteCurrency?.availableRemain || 0;

  const assets =
    marketsTicker?.filter(
      (item) =>
        item.baseAsset === selectedMarket?.baseAsset &&
        item.quoteCurrency?.canCharge,
    ) || [];

  const canThrowError =
    errors["recieve"] && spend !== null && spend !== undefined;

  return (
    <>
      <BuySellContext.Controller
        name="recieve"
        rules={{
          validate: {
            check: (value) => {
              if (lastChangeInput !== "recieve") {
                return undefined;
              }
              return getTotalError({
                side: "Sell",
                symbol: selected,
                total: Number(value),
              });
            },
          },
        }}
        render={({ field: { onChange, value, ...rest } }) => {
          return render({
            field: {
              value: value,
              assets,
              availableRemain,
              minQuantity: minNotional || 0,
              maxQuantity: maxNotional || 0,
              asset: selectedMarket,
              hasError: value ? !!errors.recieve : false,
              onSelect(asset?: MarketTicker) {
                setValue("selected", asset?.symbol);
              },
              onChange(value) {
                onChange(value === "" ? null : value);
                clearErrors("spend");
                setValue("spend", "");
                setValue("lastChangeInput", "recieve");
              },
              ...rest,
            },
          });
        }}
      />
      {renderErrorComponent &&
        renderErrorComponent(canThrowError ? errors["recieve"]?.message : "")}
    </>
  );
};

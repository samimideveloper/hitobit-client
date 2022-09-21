import Decimal from "decimal.js";
import { groupBy, map } from "lodash-es";
import React, { ReactNode } from "react";
import { ControllerRenderProps } from "react-hook-form";
import { MarketTicker, useMarketTicker } from "../marketTicker";
import { useMarketFilters } from "../useMarketFilters";
import { useOrderPlacingError } from "../useOrderPlacingError";
import { useStepSize } from "../useStepSize";
import { BuySellContext, BuySellFormProps } from "./context";

type SellSpendRenderProps = {
  render: (state: {
    field: ControllerRenderProps<BuySellFormProps, "spend"> & {
      assets: MarketTicker[];
      asset?: MarketTicker;
      minQuantity: number;
      maxQuantity: number;
      hasError?: boolean;
      availableRemain: number;
      onSelect?: (value?: MarketTicker | undefined) => void;
      getMaxSize?: (
        value: string | number | Decimal,
        passedSymbol?: string | undefined,
      ) => string;
    };
  }) => React.ReactElement;

  renderErrorComponent?: (message?: string) => ReactNode;
};

export const SellSpendController = ({
  render,
  renderErrorComponent,
}: SellSpendRenderProps) => {
  const { lastChangeInput, selected, spend } = BuySellContext.useWatch();

  const { errors } = BuySellContext.useFormState();

  const { setValue, clearErrors } = BuySellContext.useFormContext();

  const { getAmountError } = useOrderPlacingError();

  const { marketsTicker, getSymbolMarketTicker } = useMarketTicker();

  const marketsTickerGrouped = map(
    groupBy(
      marketsTicker?.filter((item) => item.quoteCurrency?.canCharge),
      (item) => item.baseAsset,
    ),
    (item) => item[0],
  );

  const selectedMarket = getSymbolMarketTicker(selected);

  const { minQuantity: _minQuantity, maxQuantity: _maxQuantity } =
    useMarketFilters({ selectedMarket });

  const availableRemain = selectedMarket?.baseCurrency?.availableRemain || 0;

  const { toStepSize } = useStepSize(selected);

  const minQuantity = _minQuantity || 0;

  const maxQuantity =
    selectedMarket?.baseCurrency?.availableRemain || _maxQuantity || 0;

  const canThrowError =
    errors["spend"] && spend !== null && spend !== undefined;

  return (
    <>
      <BuySellContext.Controller
        name="spend"
        rules={{
          validate: {
            check: (value) => {
              if (!lastChangeInput || !value) {
                //   return t("enterAmount");
              }

              if (lastChangeInput !== "spend") {
                return undefined;
              }
              return getAmountError({
                side: "Sell",
                symbol: selected,
                baseQuantity: Number(value),
              });
            },
          },
        }}
        render={({ field: { onChange, value, ...rest } }) => {
          return render({
            field: {
              value: value,
              assets: marketsTickerGrouped || [],
              availableRemain,
              minQuantity,
              maxQuantity,
              asset: selectedMarket,
              getMaxSize: toStepSize,
              hasError: value ? !!errors.spend : false,
              onSelect(asset?: MarketTicker) {
                setValue("selected", asset?.symbol);
              },
              onChange(value) {
                onChange(value === "" ? null : value);
                clearErrors("recieve");
                setValue("recieve", "");
                setValue("lastChangeInput", "spend");
              },
              ...rest,
            },
          });
        }}
      />
      {renderErrorComponent &&
        renderErrorComponent(canThrowError ? errors["spend"]?.message : "")}
    </>
  );
};

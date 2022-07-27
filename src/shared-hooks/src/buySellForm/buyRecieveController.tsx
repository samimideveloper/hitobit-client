import React, { ReactNode } from "react";
import { ControllerRenderProps } from "react-hook-form";
import { MarketTicker } from "../marketTicker";
import { useConvertBaseToQuote } from "../useConvertBaseToQuote";
import { useMarketFilters } from "../useMarketFilters";
import { useOrderPlacingError } from "../useOrderPlacingError";
import { useStepSize } from "../useStepSize";
import { BuySellContext, BuySellFormProps } from "./context";
import { useBuySellErrorContext, useMarketsTickerContext } from "./provider";

type BuyRecieveRenderProps = {
  render: (state: {
    field: ControllerRenderProps<BuySellFormProps, "recieve"> & {
      assets: MarketTicker[];
      asset?: MarketTicker;
      minQuantity: number;
      maxQuantity: number;
      hasError?: boolean;
      availableRemain: number;
      onSelect?: (value?: MarketTicker | undefined) => void;
      onFocus?: () => void;
      getMaxSize?: (value: number) => string | number;
    };
  }) => React.ReactElement;

  renderErrorComponent?: (message?: string) => ReactNode;
};

export const BuyRecieveController = ({
  render,
  renderErrorComponent,
}: BuyRecieveRenderProps) => {
  const { lastChangeInput, selected, spend } = BuySellContext.useWatch();

  const { errors } = BuySellContext.useFormState();

  const convert = useConvertBaseToQuote();

  const errorMessages = useBuySellErrorContext();

  const { setValue, clearErrors, register, trigger } =
    BuySellContext.useFormContext();

  register("shouldCharge");

  const { getAmountError } = useOrderPlacingError(errorMessages);

  const { marketsTicker, getSymbolMarketTicker } = useMarketsTickerContext();

  const selectedMarket = getSymbolMarketTicker(selected);

  const { toTickSize } = useStepSize(selected);

  const isChargeable = selectedMarket?.quoteCurrency?.canCharge;

  const { minQuantity, maxQuantity } = useMarketFilters({ selectedMarket });

  const availableRemain = selectedMarket?.quoteCurrency?.availableRemain || 0;

  const assets =
    marketsTicker?.filter(
      (item) => item.quoteAsset === selectedMarket?.quoteAsset,
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
              if (!value) {
                if (typeof errorMessages.REQUIRED === "function") {
                  return errorMessages.REQUIRED();
                }
                return errorMessages.REQUIRED;
              }

              const convertedBaseQuantity = convert(
                Number(value || 0),
                selectedMarket?.baseAsset,
                selectedMarket?.quoteAsset,
              );
              if (
                isChargeable &&
                Number(selectedMarket?.quoteCurrency?.availableRemain) <
                  convertedBaseQuantity
              ) {
                setValue("shouldCharge", true);
                if (
                  typeof errorMessages.INSUFFICIENT_BALANCE_FUND === "function"
                ) {
                  return errorMessages.INSUFFICIENT_BALANCE_FUND();
                }
                return errorMessages.INSUFFICIENT_BALANCE_FUND;
              } else {
                setValue("shouldCharge", false);
              }
              return getAmountError({
                side: "Buy",
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
              assets,
              availableRemain,
              minQuantity: minQuantity || 0,
              maxQuantity: maxQuantity || 0,
              asset: selectedMarket,
              hasError: value ? !!errors.recieve : false,
              getMaxSize: toTickSize,
              onFocus() {
                if (lastChangeInput !== "recieve") {
                  setValue("lastChangeInput", "recieve");
                  setValue("spend", "");
                }
              },
              async onSelect(asset?: MarketTicker) {
                setValue("selected", asset?.symbol);
                await trigger("recieve");
              },
              onChange(value) {
                onChange(value === "" ? null : value);
                setValue("spend", "");
                clearErrors("spend");
                lastChangeInput !== "recieve" &&
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

import Decimal from "decimal.js";
import { useMarketTicker, useStepSize } from "hitobit-hooks/src";
import { selectedSymbolStore } from "hitobit-store/src";
import { ControllerRenderProps } from "react-hook-form";
import { useOrderPlacingError } from "../../../useOrderPlacingError";
import { MarketOrderValues, SellForm } from "../types";

const ControllerTotal = ({
  render,
}: {
  render: (state: {
    field: ControllerRenderProps<MarketOrderValues, "total">;
  }) => any;
}) => {
  const { selectedSymbol } = selectedSymbolStore.useState();
  const { selectedOption } = SellForm.useWatch();
  const { setValue, trigger } = SellForm.useFormContext();

  const { getSymbolMarketTicker } = useMarketTicker();
  const currentTicker = getSymbolMarketTicker(selectedSymbol?.symbol);
  const { toStepSize } = useStepSize(selectedSymbol?.symbol);

  const { getTotalError } = useOrderPlacingError();

  return (
    <SellForm.Controller
      name="total"
      rules={{
        validate: {
          check: (value) => {
            if (selectedOption.value !== "total") {
              return;
            }

            if (!Number(value)) {
              return;
            }

            return getTotalError({
              symbol: selectedSymbol?.symbol,
              side: "Sell",
              total: Number(value),
            });
          },
        },
      }}
      render={({ field: { onChange, ...rest } }) =>
        render({
          field: {
            onChange: (_value) => {
              if (selectedOption.value !== "total") {
                return;
              }

              setValue(
                "amount",
                _value && currentTicker?.lastPrice
                  ? toStepSize(new Decimal(_value).div(currentTicker.lastPrice))
                  : "",
              );

              onChange(_value);
              trigger(["amount", "total"]);
            },
            ...rest,
          },
        })
      }
    />
  );
};

export { ControllerTotal };

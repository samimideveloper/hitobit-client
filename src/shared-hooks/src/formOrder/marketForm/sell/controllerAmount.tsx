import Decimal from "decimal.js";
import { ControllerRenderProps } from "react-hook-form";
import {
  useMarketTicker,
  useOrderPlacingError,
  useStepSize,
} from "shared-hooks/src";
import { selectedSymbolStore } from "shared-store/src";
import { MarketOrderValues, SellForm } from "../types";

const ControllerAmount = ({
  render,
}: {
  render: (state: {
    field: ControllerRenderProps<MarketOrderValues, "amount">;
  }) => any;
}) => {
  const { selectedSymbol } = selectedSymbolStore.useState();
  const { selectedOption } = SellForm.useWatch();
  const { setValue, trigger } = SellForm.useFormContext();

  const { getSymbolMarketTicker } = useMarketTicker();
  const currentTicker = getSymbolMarketTicker(selectedSymbol?.symbol);
  const { toTickSize } = useStepSize(selectedSymbol?.symbol);
  const { getAmountError } = useOrderPlacingError();

  return (
    <SellForm.Controller
      name="amount"
      rules={{
        validate: {
          check: (value) => {
            if (selectedOption.value !== "amount") {
              return;
            }

            if (!Number(value)) {
              return;
            }

            return getAmountError({
              symbol: selectedSymbol?.symbol,
              side: "Sell",
              baseQuantity: Number(value),
            });
          },
        },
      }}
      render={({ field: { onChange, ...rest } }) =>
        render({
          field: {
            onChange: (_value) => {
              if (selectedOption.value !== "amount") {
                return;
              }

              setValue(
                "total",
                _value && currentTicker?.lastPrice
                  ? toTickSize(new Decimal(_value).mul(currentTicker.lastPrice))
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

export { ControllerAmount };

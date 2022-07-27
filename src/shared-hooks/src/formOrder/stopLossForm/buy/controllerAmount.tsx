import Decimal from "decimal.js";
import { ControllerRenderProps } from "react-hook-form";
import {
  useMarketTicker,
  useOrderPlacingError,
  useStepSize,
} from "shared-hooks/src";
import { selectedSymbolStore } from "shared-store/src";
import { BuyForm, MarketOrderValues } from "../types";

const ControllerAmount = ({
  render,
}: {
  render: (state: {
    field: ControllerRenderProps<MarketOrderValues, "amount">;
  }) => any;
}) => {
  const { setValue, trigger } = BuyForm.useFormContext();
  const { selectedOption } = BuyForm.useWatch();
  const { selectedSymbol } = selectedSymbolStore.useState();

  const { getAmountError } = useOrderPlacingError();

  const { getSymbolMarketTicker } = useMarketTicker();
  const { toTickSize } = useStepSize(selectedSymbol?.symbol);
  const currentTicker = getSymbolMarketTicker(selectedSymbol?.symbol);

  return (
    <BuyForm.Controller
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
              side: "Buy",
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

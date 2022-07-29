import Decimal from "decimal.js";
import {
  useMarketTicker,
  useOrderPlacingError,
  useStepSize,
} from "hitobit-hooks/src";
import { selectedSymbolStore } from "hitobit-store/src";
import { ControllerRenderProps } from "react-hook-form";
import { BuyForm, MarketOrderValues } from "../types";

const ControllerTotal = ({
  render,
}: {
  render: (state: {
    field: ControllerRenderProps<MarketOrderValues, "total">;
  }) => any;
}) => {
  const { setValue, trigger } = BuyForm.useFormContext();
  const { selectedOption } = BuyForm.useWatch();
  const { selectedSymbol } = selectedSymbolStore.useState();

  const { getTotalError } = useOrderPlacingError();

  const { getSymbolMarketTicker } = useMarketTicker();
  const { toStepSize } = useStepSize(selectedSymbol?.symbol);
  const currentTicker = getSymbolMarketTicker(selectedSymbol?.symbol);

  return (
    <BuyForm.Controller
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
              side: "Buy",
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

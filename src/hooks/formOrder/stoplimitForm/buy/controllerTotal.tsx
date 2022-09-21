import Decimal from "decimal.js";
import { ControllerRenderProps } from "react-hook-form";
import { selectedSymbolStore } from "../../../../store";
import { useOrderPlacingError } from "../../../useOrderPlacingError";
import { useStepSize } from "../../../useStepSize";
import { BuyForm, StopLimitOrderValues } from "../types";

const ControllerTotal = ({
  render,
}: {
  render: (state: {
    field: ControllerRenderProps<StopLimitOrderValues, "total">;
  }) => any;
}) => {
  const { selectedSymbol } = selectedSymbolStore.useState();

  const {
    setValue: buySetValue,
    getValues,
    trigger,
  } = BuyForm.useFormContext();

  const { toStepSize } = useStepSize(selectedSymbol?.symbol);

  const { getTotalError } = useOrderPlacingError();

  return (
    <BuyForm.Controller
      name="total"
      rules={{
        validate: {
          check: (value) => {
            const { price } = getValues();

            return getTotalError({
              symbol: selectedSymbol?.symbol,
              side: "Buy",
              price: Number(price),
              total: Number(value),
            });
          },
        },
      }}
      render={({ field: { onChange, ...rest } }) =>
        render({
          field: {
            onChange: (_value) => {
              const { price } = getValues();

              buySetValue(
                "amount",
                price && _value
                  ? toStepSize(new Decimal(_value).div(Number(price)))
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

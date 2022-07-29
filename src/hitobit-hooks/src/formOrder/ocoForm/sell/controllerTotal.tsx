import Decimal from "decimal.js";
import { useOrderPlacingError, useStepSize } from "hitobit-hooks";
import { selectedSymbolStore } from "hitobit-store";
import { ControllerRenderProps } from "react-hook-form";
import { OcoOrderValues, SellForm } from "../types";

const ControllerTotal = ({
  render,
}: {
  render: (state: {
    field: ControllerRenderProps<OcoOrderValues, "total">;
  }) => any;
}) => {
  const {
    setValue: sellSetValue,
    getValues,
    trigger,
  } = SellForm.useFormContext();

  const { selectedSymbol } = selectedSymbolStore.useState();

  const { toStepSize } = useStepSize(selectedSymbol?.symbol);

  const { getTotalError } = useOrderPlacingError();

  return (
    <SellForm.Controller
      name="total"
      rules={{
        validate: {
          check: (value) => {
            const { price } = getValues();
            return getTotalError({
              symbol: selectedSymbol?.symbol,
              side: "Sell",
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

              sellSetValue(
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

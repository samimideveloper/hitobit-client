import { ControllerRenderProps } from "react-hook-form";
import { selectedSymbolStore } from "../../../../store";
import { useOrderPlacingError } from "../../../useOrderPlacingError";
import { BuyForm, StopLimitOrderValues } from "../types";

const ControllerStopPrice = ({
  render,
}: {
  render: (state: {
    field: ControllerRenderProps<StopLimitOrderValues, "stopPrice">;
  }) => any;
}) => {
  const { selectedSymbol } = selectedSymbolStore.useState();

  const { getPriceError } = useOrderPlacingError();

  return (
    <BuyForm.Controller
      name="stopPrice"
      rules={{
        validate: {
          check: (value) => {
            return getPriceError({
              symbol: selectedSymbol?.symbol,
              price: Number(value),
            });
          },
        },
      }}
      render={({ field: { ...rest } }) =>
        render({
          field: rest,
        })
      }
    />
  );
};

export { ControllerStopPrice };

import { ControllerRenderProps } from "react-hook-form";
import { selectedSymbolStore } from "../../../../store";
import { useOrderPlacingError } from "../../../useOrderPlacingError";
import { SellForm, StopLimitOrderValues } from "../types";

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
    <SellForm.Controller
      name="stopPrice"
      rules={{
        validate: {
          check: (value) => {
            if (!value) {
              return;
            }

            return getPriceError({
              symbol: selectedSymbol?.symbol,
              price: Number(value),
            });
          },
        },
      }}
      render={render}
    />
  );
};

export { ControllerStopPrice };

import { ControllerRenderProps } from "react-hook-form";
import { selectedSymbolStore } from "../../../../store";
import { useOrderPlacingError } from "../../../useOrderPlacingError";
import { MarketOrderValues, SellForm } from "../types";

const ControllerStopPrice = ({
  render,
}: {
  render: (state: {
    field: ControllerRenderProps<MarketOrderValues, "stopPrice">;
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
            return getPriceError({
              symbol: selectedSymbol?.symbol,
              price: Number(value),
            });
          },
        },
      }}
      render={({ field: { ...rest } }) =>
        render({
          field: {
            ...rest,
          },
        })
      }
    />
  );
};

export { ControllerStopPrice };

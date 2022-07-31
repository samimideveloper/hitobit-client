import Decimal from "decimal.js";
import { selectedSymbolStore } from "hitobit-store";
import { ControllerRenderProps } from "react-hook-form";
import { useMarketTicker } from "../../../marketTicker";
import { useStepSize } from "../../../useStepSize";
import { useUserSelectedUserAssets } from "../../../useUserSelectedUserAssets";
import { BuyForm, MarketOrderValues } from "../types";

const ControllerSlider = ({
  render,
}: {
  render: (state: {
    field: ControllerRenderProps<MarketOrderValues, "slider">;
  }) => any;
}) => {
  const { setValue, trigger } = BuyForm.useFormContext();

  const { selectedSymbol } = selectedSymbolStore.useState();

  const { toTickSize, toStepSize } = useStepSize(selectedSymbol?.symbol);

  const { getSymbolMarketTicker } = useMarketTicker();
  const currentTicker = getSymbolMarketTicker(selectedSymbol?.symbol);

  const { quoteAvailableRemain } = useUserSelectedUserAssets();

  return (
    <BuyForm.Controller
      name="slider"
      render={({ field: { onChange, ...rest } }) =>
        render({
          field: {
            onChange: (_value) => {
              onChange(_value);

              setValue("selectedOption", { value: "total" });
              trigger(["amount", "total"]);

              const total =
                _value && quoteAvailableRemain
                  ? toTickSize(
                      new Decimal(Number(quoteAvailableRemain))
                        .mul(_value)
                        .div(100),
                    )
                  : "";

              setValue("total", total);

              setValue(
                "amount",
                currentTicker?.lastPrice
                  ? toStepSize(new Decimal(total).div(currentTicker?.lastPrice))
                  : "",
              );
              trigger(["amount", "total"]);
            },
            ...rest,
          },
        })
      }
    />
  );
};

export { ControllerSlider };

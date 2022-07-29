import Decimal from "decimal.js";
import {
  useMarketTicker,
  useStepSize,
  useUserSelectedUserAssets,
} from "hitobit-hooks/src";
import { selectedSymbolStore } from "hitobit-store/src";
import { ControllerRenderProps } from "react-hook-form";
import { MarketOrderValues, SellForm } from "../types";

const ControllerSlider = ({
  render,
}: {
  render: (state: {
    field: ControllerRenderProps<MarketOrderValues, "slider">;
  }) => any;
}) => {
  const { selectedSymbol } = selectedSymbolStore.useState();
  const { setValue, trigger } = SellForm.useFormContext();

  const { toStepSize, toTickSize } = useStepSize(selectedSymbol?.symbol);

  const { baseAvailableRemain } = useUserSelectedUserAssets();

  const { getSymbolMarketTicker } = useMarketTicker();
  const currentTicker = getSymbolMarketTicker(selectedSymbol?.symbol);

  return (
    <SellForm.Controller
      name="slider"
      render={({ field: { onChange, ...rest } }) =>
        render({
          field: {
            onChange: (_value) => {
              onChange(_value);
              let result: Decimal | string = new Decimal("");

              if (_value && baseAvailableRemain) {
                result = new Decimal(baseAvailableRemain).mul(_value).div(100);
              }

              setValue(
                "total",
                toTickSize(
                  currentTicker?.lastPrice
                    ? result.mul(currentTicker.lastPrice)
                    : "",
                ),
              );
              setValue("amount", toStepSize(result) || "");
              setValue("selectedOption", { value: "amount" });
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

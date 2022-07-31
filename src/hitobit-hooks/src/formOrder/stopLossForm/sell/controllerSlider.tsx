import Decimal from "decimal.js";
import { selectedSymbolStore } from "hitobit-store";
import { ControllerRenderProps } from "react-hook-form";
import { useStepSize } from "../../../useStepSize";
import { useUserSelectedUserAssets } from "../../../useUserSelectedUserAssets";
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

  const { toStepSize } = useStepSize(selectedSymbol?.symbol);

  const { baseAvailableRemain } = useUserSelectedUserAssets();

  return (
    <SellForm.Controller
      name="slider"
      render={({ field: { onChange, ...rest } }) =>
        render({
          field: {
            onChange: (_value) => {
              onChange(_value);
              let result: Decimal | string = "";

              if (_value && baseAvailableRemain) {
                result = toStepSize(
                  new Decimal(baseAvailableRemain).mul(_value),
                );
              }

              setValue("amount", result.toString());
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

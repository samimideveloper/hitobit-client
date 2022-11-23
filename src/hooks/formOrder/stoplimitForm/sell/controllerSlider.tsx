import Decimal from "decimal.js";
import { t } from "i18next";
import { ControllerRenderProps } from "react-hook-form";
import { selectedSymbolStore } from "../../../../store";
import { useStepSize } from "../../../useStepSize";
import { useUserSelectedUserAssets } from "../../../useUserSelectedUserAssets";
import { SellForm, StopLimitOrderValues } from "../types";

const ControllerSlider = ({
  render,
}: {
  render: (state: {
    field: ControllerRenderProps<StopLimitOrderValues, "slider">;
  }) => any;
}) => {
  const {
    setValue: sellSetValue,
    getValues,
    setError,
    trigger,
  } = SellForm.useFormContext();

  const { selectedSymbol } = selectedSymbolStore.useState();

  const { toStepSize, toTickSize } = useStepSize(selectedSymbol?.symbol);

  const { baseAvailableRemain } = useUserSelectedUserAssets();

  return (
    <SellForm.Controller
      name="slider"
      render={({ field: { onChange, ...rest } }) =>
        render({
          field: {
            onChange: (_value) => {
              const { price } = getValues();
              let result: Decimal = new Decimal(0);

              if (!price) {
                setError("price", { message: t("enterPrice") });

                return;
              }

              if (!baseAvailableRemain) {
                return;
              }

              if (_value && baseAvailableRemain) {
                result = new Decimal(baseAvailableRemain).mul(_value).div(100);
              }

              sellSetValue("amount", toStepSize(result) || "");
              sellSetValue("total", toTickSize(result.mul(price)) || "");

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

export { ControllerSlider };

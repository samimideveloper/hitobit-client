import Decimal from "decimal.js";
import { ControllerRenderProps } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { selectedSymbolStore } from "../../../../store";
import { useOrderPlacingError } from "../../../useOrderPlacingError";
import { useStepSize } from "../../../useStepSize";
import { useStepValues } from "../../../useStepValues";
import { BuyForm, StopLimitOrderValues } from "../types";

const ControllerAmount = ({
  render,
}: {
  render: (state: {
    field: ControllerRenderProps<StopLimitOrderValues, "amount">;
  }) => any;
}) => {
  const { t } = useTranslation();
  const { selectedSymbol } = selectedSymbolStore.useState();

  const {
    setValue: buySetValue,
    getValues,
    trigger,
  } = BuyForm.useFormContext();

  const { toTickSize } = useStepSize(selectedSymbol?.symbol);

  const { getAmountError } = useOrderPlacingError();

  const { expectedValue, onChangeValue } = useStepValues(
    selectedSymbol?.symbol,
  );

  return (
    <BuyForm.Controller
      name="amount"
      rules={{
        validate: {
          check: (value) => {
            const { price } = getValues();

            if (!price) {
              return t("enterAmount");
            }

            return getAmountError({
              symbol: selectedSymbol?.symbol,
              side: "Buy",
              baseQuantity: Number(value),
              price: Number(price),
            });
          },
        },
      }}
      render={({ field: { onChange, value, ...rest } }) =>
        render({
          field: {
            value: expectedValue(value),
            onChange: (_value) => {
              const { price } = getValues();

              buySetValue(
                "total",
                price && _value
                  ? toTickSize(new Decimal(_value).mul(Number(price)))
                  : "",
              );

              onChange(onChangeValue(_value));
              trigger(["total"]);
            },
            ...rest,
          },
        })
      }
    />
  );
};

export { ControllerAmount };

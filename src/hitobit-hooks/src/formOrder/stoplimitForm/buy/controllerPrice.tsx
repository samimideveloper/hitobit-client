import Decimal from "decimal.js";
import { selectedSymbolStore } from "hitobit-store";
import { ControllerRenderProps } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useOrderPlacingError } from "../../../useOrderPlacingError";
import { useStepSize } from "../../../useStepSize";
import { BuyForm, StopLimitOrderValues } from "../types";

const ControllerPrice = ({
  render,
}: {
  render: (state: {
    field: ControllerRenderProps<StopLimitOrderValues, "price">;
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

  const { getPriceError } = useOrderPlacingError();

  return (
    <BuyForm.Controller
      name="price"
      rules={{
        validate: {
          check: (value) => {
            if (!value) {
              return t("enterPrice");
            }

            return getPriceError({
              symbol: selectedSymbol?.symbol,
              price: Number(value),
            });
          },
        },
      }}
      render={({ field: { onChange, ...rest } }) =>
        render({
          field: {
            onChange: (_value) => {
              const { amount } = getValues();

              onChange(_value);
              buySetValue(
                "total",
                amount && _value
                  ? toTickSize(new Decimal(_value).mul(Number(amount)))
                  : "",
              );
              trigger(["total"]);
            },
            ...rest,
          },
        })
      }
    />
  );
};

export { ControllerPrice };

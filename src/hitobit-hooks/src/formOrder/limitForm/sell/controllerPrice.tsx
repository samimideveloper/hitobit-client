import Decimal from "decimal.js";
import { useOrderPlacingError, useStepSize } from "hitobit-hooks";
import { useTranslation } from "hitobit-modules";
import { selectedSymbolStore } from "hitobit-store";
import { ControllerRenderProps } from "react-hook-form";
import { LimitOrderValues, SellForm } from "../types";

const ControllerPrice = ({
  render,
}: {
  render: (state: {
    field: ControllerRenderProps<LimitOrderValues, "price">;
  }) => any;
}) => {
  const { t } = useTranslation();
  const {
    setValue: sellSetValue,
    getValues,
    trigger,
  } = SellForm.useFormContext();

  const { selectedSymbol } = selectedSymbolStore.useState();

  const { toTickSize } = useStepSize(selectedSymbol?.symbol);

  const { getPriceError } = useOrderPlacingError();

  return (
    <SellForm.Controller
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
              const { price, amount } = getValues();

              onChange(_value);
              sellSetValue(
                "total",
                price && amount && _value
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

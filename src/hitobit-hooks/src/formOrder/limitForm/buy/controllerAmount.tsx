import Decimal from "decimal.js";
import { useOrderPlacingError, useStepSize } from "hitobit-hooks";
import { useTranslation } from "hitobit-modules/src";
import { selectedSymbolStore } from "hitobit-store";
import { ControllerRenderProps } from "react-hook-form";
import { BuyForm, LimitOrderValues } from "../types";

const ControllerAmount = ({
  render,
}: {
  render: (state: {
    field: ControllerRenderProps<LimitOrderValues, "amount">;
  }) => any;
}) => {
  const { t } = useTranslation();
  const { selectedSymbol } = selectedSymbolStore.useState();

  const {
    setValue: buySetValue,
    getValues,
    trigger,
    setError,
  } = BuyForm.useFormContext();

  const { toTickSize } = useStepSize(selectedSymbol?.symbol);

  const { getAmountError } = useOrderPlacingError();

  return (
    <BuyForm.Controller
      name="amount"
      rules={{
        validate: {
          check: (value) => {
            const { price } = getValues();

            if (!price) {
              setError("price", { message: t("enterAmount") });
              return;
            }

            if (!Number(value)) {
              return;
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
      render={({ field: { onChange, ...rest } }) =>
        render({
          field: {
            onChange: (_value) => {
              const { price } = getValues();

              buySetValue(
                "total",
                price && _value
                  ? toTickSize(new Decimal(_value).mul(Number(price)))
                  : "",
              );

              onChange(_value);
              trigger(["amount"]);
            },
            ...rest,
          },
        })
      }
    />
  );
};

export { ControllerAmount };

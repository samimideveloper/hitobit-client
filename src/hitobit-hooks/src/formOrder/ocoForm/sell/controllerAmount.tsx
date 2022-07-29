import Decimal from "decimal.js";
import { useOrderPlacingError, useStepSize } from "hitobit-hooks";
import { useTranslation } from "hitobit-modules";
import { selectedSymbolStore } from "hitobit-store";
import { ControllerRenderProps } from "react-hook-form";
import { OcoOrderValues, SellForm } from "../types";

const ControllerAmount = ({
  render,
}: {
  render: (state: {
    field: ControllerRenderProps<OcoOrderValues, "amount">;
  }) => any;
}) => {
  const { t } = useTranslation();
  const {
    setValue: sellSetValue,
    getValues,
    trigger,
    setError,
  } = SellForm.useFormContext();

  const { selectedSymbol } = selectedSymbolStore.useState();

  const { toTickSize } = useStepSize(selectedSymbol?.symbol);

  const { getAmountError } = useOrderPlacingError();

  return (
    <SellForm.Controller
      name="amount"
      rules={{
        validate: {
          check: (value) => {
            const { limit, price } = getValues();

            if (!limit) {
              setError("limit", { message: t("enterAmount") });
              return;
            }
            if (!price) {
              setError("price", { message: t("enterAmount") });
              return;
            }

            if (!Number(value)) {
              return;
            }

            return getAmountError({
              symbol: selectedSymbol?.symbol,
              side: "Sell",
              baseQuantity: Number(value),
              price: Math.max(Number(limit), Number(price)),
            });
          },
        },
      }}
      render={({ field: { onChange, ...rest } }) =>
        render({
          field: {
            onChange: (_value) => {
              const { price } = getValues();

              sellSetValue(
                "total",
                price && _value
                  ? toTickSize(new Decimal(_value).mul(Number(price)))
                  : "",
              );
              onChange(_value);

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

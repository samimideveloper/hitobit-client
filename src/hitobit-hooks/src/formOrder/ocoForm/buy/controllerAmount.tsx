import Decimal from "decimal.js";
import { useOrderPlacingError, useStepSize } from "hitobit-hooks";
import { useTranslation } from "hitobit-modules";
import { selectedSymbolStore } from "hitobit-store";
import { ControllerRenderProps } from "react-hook-form";
import { BuyForm, OcoOrderValues } from "../types";

const ControllerAmount = ({
  render,
}: {
  render: (state: {
    field: ControllerRenderProps<OcoOrderValues, "amount">;
  }) => any;
}) => {
  const { t } = useTranslation();
  const { selectedSymbol } = selectedSymbolStore.useState();

  const {
    setValue: buySetValue,
    getValues,
    setError,
    trigger,
  } = BuyForm.useFormContext();

  const { toTickSize } = useStepSize(selectedSymbol?.symbol);

  const { getAmountError } = useOrderPlacingError();

  return (
    <BuyForm.Controller
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

            return getAmountError({
              symbol: selectedSymbol?.symbol,
              side: "Buy",
              baseQuantity: Number(value),
              price: Math.max(Number(limit), Number(price)),
            });
          },
        },
      }}
      render={({ field: { onChange, ...rest } }) =>
        render({
          field: {
            onChange: (amount) => {
              if (amount) {
                const { price, limit } = getValues();
                const total = toTickSize(
                  new Decimal(amount).mul(
                    Math.max(Number(limit), Number(price)),
                  ),
                );
                buySetValue("total", total);
              } else {
                buySetValue("total", "");
              }
              onChange(amount);
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

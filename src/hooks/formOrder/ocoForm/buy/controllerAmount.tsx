import Decimal from "decimal.js";
import { ControllerRenderProps } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { selectedSymbolStore } from "../../../../store";
import { useOrderPlacingError } from "../../../useOrderPlacingError";
import { useStepSize } from "../../../useStepSize";
import { useStepValues } from "../../../useStepValues";
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

  const { expectedValue, onChangeValue } = useStepValues(
    selectedSymbol?.symbol,
  );

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
      render={({ field: { onChange, value, ...rest } }) =>
        render({
          field: {
            value: expectedValue(value),
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
              onChange(onChangeValue(amount));
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

import Decimal from "decimal.js";
import { ControllerRenderProps } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useOrderPlacingError, useStepSize } from "shared-hooks";
import { selectedSymbolStore } from "shared-store";
import { BuyForm, OcoOrderValues } from "../types";

const ControllerLimit = ({
  render,
}: {
  render: (state: {
    field: ControllerRenderProps<OcoOrderValues, "limit">;
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
      name="limit"
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
            onChange: (limit) => {
              const { amount, price } = getValues();
              if (limit && amount) {
                const total = toTickSize(
                  new Decimal(amount).mul(
                    Math.max(Number(limit), Number(price)),
                  ),
                );
                buySetValue("total", total);
              } else {
                buySetValue("total", "");
              }
              onChange(limit);
            },
            ...rest,
          },
        })
      }
    />
  );
};

export { ControllerLimit };

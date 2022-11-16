import Decimal from "decimal.js";
import { ControllerRenderProps } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { selectedSymbolStore } from "../../../../store";
import { useOrderPlacingError } from "../../../useOrderPlacingError";
import { useStepSize } from "../../../useStepSize";
import { OcoOrderValues, SellForm } from "../types";

const ControllerLimit = ({
  render,
}: {
  render: (state: {
    field: ControllerRenderProps<OcoOrderValues, "limit">;
  }) => any;
}) => {
  const { t } = useTranslation();
  const { setValue: sellSetValue, getValues } = SellForm.useFormContext();

  const { selectedSymbol } = selectedSymbolStore.useState();

  const { toTickSize } = useStepSize(selectedSymbol?.symbol);

  const { getPriceError } = useOrderPlacingError();

  return (
    <SellForm.Controller
      name="limit"
      rules={{
        validate: {
          check: (value) => {
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
                const stopPriceTotal = toTickSize(
                  new Decimal(amount).mul(Number(price)),
                );
                const limitTotal = toTickSize(
                  new Decimal(amount).mul(Number(limit)),
                );
                if (Number(stopPriceTotal) > Number(limitTotal)) {
                  sellSetValue("total", stopPriceTotal);
                } else {
                  sellSetValue("total", limitTotal);
                }
              } else {
                sellSetValue("total", "");
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

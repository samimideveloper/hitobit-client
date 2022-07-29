import Decimal from "decimal.js";
import { useOrderPlacingError, useStepSize } from "hitobit-hooks";
import { useTranslation } from "hitobit-modules";
import { selectedSymbolStore } from "hitobit-store";
import { ControllerRenderProps } from "react-hook-form";
import { OcoOrderValues, SellForm } from "../types";

const ControllerPrice = ({
  render,
}: {
  render: (state: {
    field: ControllerRenderProps<OcoOrderValues, "price">;
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
            onChange: (price) => {
              const { amount, limit } = getValues();
              if (price && amount) {
                const stopPriceTotal = toTickSize(
                  new Decimal(amount).mul(Number(price)),
                );
                const limitTotal = toTickSize(
                  new Decimal(amount).mul(Number(limit || 0)),
                );
                if (Number(stopPriceTotal) > Number(limitTotal)) {
                  sellSetValue("total", stopPriceTotal);
                } else {
                  sellSetValue("total", limitTotal);
                }
              } else {
                sellSetValue("total", "");
              }
              onChange(price);
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

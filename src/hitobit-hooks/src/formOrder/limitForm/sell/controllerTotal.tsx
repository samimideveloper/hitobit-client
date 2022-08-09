import Decimal from "decimal.js";
import { selectedSymbolStore } from "hitobit-store";
import { ControllerRenderProps } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useOrderPlacingError } from "../../../useOrderPlacingError";
import { useStepSize } from "../../../useStepSize";
import { LimitOrderValues, SellForm } from "../types";

const ControllerTotal = ({
  render,
}: {
  render: (state: {
    field: ControllerRenderProps<LimitOrderValues, "total">;
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

  const { toStepSize } = useStepSize(selectedSymbol?.symbol);

  const { getTotalError } = useOrderPlacingError();

  return (
    <SellForm.Controller
      name="total"
      rules={{
        validate: {
          check: (value) => {
            const { price } = getValues();

            if (!price) {
              setError("price", { message: t("enterPrice") });

              return;
            }

            if (!Number(value)) {
              return;
            }

            return getTotalError({
              symbol: selectedSymbol?.symbol,
              side: "Sell",
              price: Number(price),
              total: Number(value),
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
                "amount",
                price && _value
                  ? toStepSize(new Decimal(_value).div(Number(price)))
                  : "",
              );

              onChange(_value);
              trigger(["amount", "total"]);
            },
            ...rest,
          },
        })
      }
    />
  );
};

export { ControllerTotal };

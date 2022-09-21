import Decimal from "decimal.js";
import { ControllerRenderProps } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { selectedSymbolStore } from "../../../../store";
import { useOrderPlacingError } from "../../../useOrderPlacingError";
import { useStepSize } from "../../../useStepSize";
import { BuyForm, LimitOrderValues } from "../types";

const ControllerTotal = ({
  render,
}: {
  render: (state: {
    field: ControllerRenderProps<LimitOrderValues, "total">;
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

  const { toStepSize } = useStepSize(selectedSymbol?.symbol);

  const { getTotalError } = useOrderPlacingError();

  return (
    <BuyForm.Controller
      name="total"
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

            return getTotalError({
              symbol: selectedSymbol?.symbol,
              side: "Buy",
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

              buySetValue(
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

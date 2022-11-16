import Decimal from "decimal.js";
import { ControllerRenderProps } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { selectedSymbolStore } from "../../../../store";
import { useMarketTicker } from "../../../marketTicker";
import { useOrderPlacingError } from "../../../useOrderPlacingError";
import { useStepSize } from "../../../useStepSize";
import { BuyForm, OcoOrderValues } from "../types";

const ControllerPrice = ({
  render,
}: {
  render: (state: {
    field: ControllerRenderProps<OcoOrderValues, "price">;
  }) => any;
}) => {
  const { t } = useTranslation();
  const { selectedSymbol } = selectedSymbolStore.useState();

  const { setValue: buySetValue, getValues } = BuyForm.useFormContext();

  const { toTickSize } = useStepSize(selectedSymbol?.symbol);

  const { getPriceError } = useOrderPlacingError();

  const { getSymbolMarketTicker } = useMarketTicker();

  const market = getSymbolMarketTicker(selectedSymbol?.symbol);

  return (
    <BuyForm.Controller
      name="price"
      rules={{
        validate: {
          check: (value) => {
            if (
              value &&
              new Decimal(value).greaterThanOrEqualTo(market?.lastPrice || 0)
            ) {
              return t("priceShouldBeLessThanLastPrice");
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
                const total = toTickSize(
                  new Decimal(amount).mul(
                    Math.max(Number(limit), Number(price)),
                  ),
                );
                buySetValue("total", total);
              } else {
                buySetValue("total", "");
              }
              onChange(price);
            },
            ...rest,
          },
        })
      }
    />
  );
};

export { ControllerPrice };

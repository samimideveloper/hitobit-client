import { ControllerRenderProps } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useOrderPlacingError } from "shared-hooks";
import { selectedSymbolStore } from "shared-store";
import { BuyForm, MarketOrderValues } from "../types";

const ControllerStopPrice = ({
  render,
}: {
  render: (state: {
    field: ControllerRenderProps<MarketOrderValues, "stopPrice">;
  }) => any;
}) => {
  const { t } = useTranslation();

  const { selectedSymbol } = selectedSymbolStore.useState();

  const { getPriceError } = useOrderPlacingError();

  return (
    <BuyForm.Controller
      name="stopPrice"
      rules={{
        validate: {
          check: (value) => {
            if (!value) {
              return t("enterStop");
            }

            if (!Number(value)) {
              return;
            }

            return getPriceError({
              symbol: selectedSymbol?.symbol,
              price: Number(value),
            });
          },
        },
      }}
      render={({ field: { ...rest } }) =>
        render({
          field: {
            ...rest,
          },
        })
      }
    />
  );
};

export { ControllerStopPrice };

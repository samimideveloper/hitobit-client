import { ControllerRenderProps } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { selectedSymbolStore } from "../../../../store";
import { useMarketTicker } from "../../../marketTicker";
import { useOrderPlacingError } from "../../../useOrderPlacingError";
import { OcoOrderValues, SellForm } from "../types";

const ControllerStopPrice = ({
  render,
}: {
  render: (state: {
    field: ControllerRenderProps<OcoOrderValues, "stopPrice">;
  }) => any;
}) => {
  const { selectedSymbol } = selectedSymbolStore.useState();

  const { t } = useTranslation();

  const { getPriceError } = useOrderPlacingError();

  const { getSymbolMarketTicker } = useMarketTicker();

  const market = getSymbolMarketTicker(selectedSymbol?.symbol);

  return (
    <SellForm.Controller
      name="stopPrice"
      rules={{
        validate: {
          check: (value) => {
            if (!value) {
              return t("enterStop");
            }

            if (Number(value) >= (market?.lastPrice || 0)) {
              return t("stopPriceShouldBeLessThanLastPrice");
            }

            return getPriceError({
              symbol: selectedSymbol?.symbol,
              price: Number(value),
            });
          },
        },
      }}
      render={render}
    />
  );
};

export { ControllerStopPrice };

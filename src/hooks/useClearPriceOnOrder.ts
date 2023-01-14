import {
  FormLimitBuy,
  FormLimitSell,
  FormMarketBuy,
  FormMarketSell,
  FormOcoBuy,
  FormOcoSell,
  FormStopLimitBuy,
  FormStopLimitSell,
} from "./formOrder";

export function useClearPriceOnOrder() {
  const { reset: resetLimitBuyValue } = FormLimitBuy.useFormContext();
  const { reset: resetLimitSellValue } = FormLimitSell.useFormContext();
  const { reset: resetStopLimitBuyValue } = FormStopLimitBuy.useFormContext();
  const { reset: resetStopLimitSellValue } = FormStopLimitSell.useFormContext();
  const { reset: resetOcoBuyValue } = FormOcoBuy.useFormContext();
  const { reset: resetOcoSellValue } = FormOcoSell.useFormContext();
  const { reset: resetMarketBuyValue } = FormMarketBuy.useFormContext();
  const { reset: resetMarketSellValue } = FormMarketSell.useFormContext();

  const clearAllPrices = () => {
    resetLimitBuyValue();
    resetLimitSellValue();
    resetStopLimitBuyValue();
    resetStopLimitSellValue();
    resetOcoBuyValue();
    resetOcoSellValue();
    resetMarketBuyValue();
    resetMarketSellValue();
  };

  return { clearAllPrices };
}

import {
  FormLimitBuy,
  FormLimitSell,
  FormOcoBuy,
  FormOcoSell,
  FormStopLimitBuy,
  FormStopLimitSell,
} from "./formOrder";

interface Arguments {
  price: string;
  amount: string;
  mode: "bid" | "ask";
}

export function useSetPriceOnClick() {
  const {
    setValue: setLimitBuyValue,
    trigger: triggerLimitBuy,
    resetField: resetLimitBuy,
  } = FormLimitBuy.useFormContext();
  const {
    setValue: setLimitSellValue,
    trigger: triggerLimitSell,
    resetField: resetLimitSell,
  } = FormLimitSell.useFormContext();
  const {
    setValue: setStopLimitBuyValue,
    trigger: triggerStopLimitBuy,
    resetField: resetStopLimitBuy,
  } = FormStopLimitBuy.useFormContext();
  const {
    setValue: setStopLimitSellValue,
    trigger: triggerStopLimitSell,
    resetField: resetStopLimitSell,
  } = FormStopLimitSell.useFormContext();
  const {
    setValue: setOcoBuyValue,
    trigger: triggerOcoBuy,
    resetField: resetOcoBuy,
  } = FormOcoBuy.useFormContext();
  const {
    setValue: setOcoSellValue,
    trigger: triggerOcoSell,
    resetField: resetOcoSell,
  } = FormOcoSell.useFormContext();

  const setFormPriceOnClick = ({ price, amount, mode }: Arguments) => {
    if (price !== "undefined") {
      setLimitBuyValue("price", price);
      setStopLimitBuyValue("price", price);
      setStopLimitSellValue("price", price);
      setOcoBuyValue("limit", price.toString());
      setOcoSellValue("limit", price.toString());
      setLimitSellValue("price", price);
    }

    if (mode === "bid") {
      setOcoSellValue("amount", amount.toString());
      setStopLimitSellValue("amount", amount);
      setLimitSellValue("amount", amount);
      setLimitBuyValue("amount", "");
      setStopLimitBuyValue("amount", "");
      setOcoBuyValue("amount", "");
      triggerLimitSell(["price", "amount"]);
      triggerStopLimitSell(["price", "amount"]);
      triggerOcoSell(["limit", "amount"]);
      resetLimitBuy("amount");
      resetStopLimitBuy("amount");
      resetOcoBuy("amount");
    } else {
      setLimitBuyValue("amount", amount);
      setStopLimitBuyValue("amount", amount);
      setOcoBuyValue("amount", amount.toString());
      setOcoSellValue("amount", "");
      setStopLimitSellValue("amount", "");
      setLimitSellValue("amount", "");
      triggerLimitBuy(["price", "amount"]);
      triggerOcoBuy(["limit", "amount"]);
      triggerStopLimitBuy(["price", "amount"]);
      resetLimitSell("amount");
      resetStopLimitSell("amount");
      resetOcoSell("amount");
    }
  };

  return { setFormPriceOnClick };
}

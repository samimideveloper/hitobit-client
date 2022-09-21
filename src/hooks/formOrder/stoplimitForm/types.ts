import { createFormContext } from "react-hook-form-context";

export interface StopLimitOrderValues {
  stopPrice: string;
  price: string;
  amount: string;
  total: string;
  slider?: number;
}

const BuyInitialValue: StopLimitOrderValues = {
  stopPrice: "",
  price: "",
  amount: "",
  total: "",
  slider: 0,
};

export const BuyForm = createFormContext(BuyInitialValue, "onChange");

// Sell Form

const SellInitialValue: StopLimitOrderValues = {
  stopPrice: "",
  price: "",
  amount: "",
  total: "",
  slider: 0,
};

export const SellForm = createFormContext(SellInitialValue, "onChange");

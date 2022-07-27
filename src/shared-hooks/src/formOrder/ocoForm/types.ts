import { createFormContext } from "react-hook-form-context";

export interface OcoOrderValues {
  price: string;

  stopPrice: string;
  limit: string;

  amount: string;
  total: string;
  slider?: number;
}

const BuyInitialValue: OcoOrderValues = {
  price: "",
  stopPrice: "",
  limit: "",
  amount: "",
  total: "",
  slider: 0,
};

export const BuyForm = createFormContext(BuyInitialValue, "onChange");

// Sell Form

const SellInitialValue: OcoOrderValues = {
  price: "",
  stopPrice: "",
  limit: "",
  amount: "",
  total: "",
  slider: 0,
};

export const SellForm = createFormContext(SellInitialValue, "onChange");

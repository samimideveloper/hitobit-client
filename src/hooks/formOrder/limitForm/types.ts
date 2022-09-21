import { createFormContext } from "react-hook-form-context";

export interface LimitOrderValues {
  price: string;
  amount: string;
  total: string;
  slider?: number;
}

const LimitOrderTypeBuyInitialValue: LimitOrderValues = {
  price: "",
  amount: "",
  total: "",
  slider: 0,
};

export const BuyForm = createFormContext(
  LimitOrderTypeBuyInitialValue,
  "onChange",
);

// Sell Form

const LimitOrderTypeSellInitialValue: LimitOrderValues = {
  price: "",
  amount: "",
  total: "",
  slider: 0,
};

export const SellForm = createFormContext(
  LimitOrderTypeSellInitialValue,
  "onChange",
);

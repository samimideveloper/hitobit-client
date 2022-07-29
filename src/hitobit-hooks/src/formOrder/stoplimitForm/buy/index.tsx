import { BuyForm } from "../types";
import { ControllerAmount } from "./controllerAmount";
import { ControllerPrice } from "./controllerPrice";
import { ControllerSlider } from "./controllerSlider";
import { ControllerStopPrice } from "./controllerStopPrice";
import { ControllerTotal } from "./controllerTotal";
import { Provider } from "./provider";
import { useSubmit } from "./useSubmit";

const FormStopLimitBuy = {
  Provider,
  ControllerAmount,
  ControllerPrice,
  ControllerSlider,
  ControllerTotal,
  ControllerStopPrice,
  useSubmit,
  useWatch: BuyForm.useWatch,
  useFormState: BuyForm.useFormState,
  useFormContext: BuyForm.useFormContext,
};

export { FormStopLimitBuy };

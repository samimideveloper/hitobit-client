import { BuyForm } from "../types";
import { ControllerAmount } from "./controllerAmount";
import { ControllerSlider } from "./controllerSlider";
import { ControllerStopPrice } from "./controllerStopPrice";
import { ControllerTotal } from "./controllerTotal";
import { Provider } from "./provider";
import { useSubmit } from "./useSubmit";

const FormStopLossBuy = {
  Provider,
  ControllerAmount,
  ControllerSlider,
  ControllerTotal,
  ControllerStopPrice,
  useSubmit,
  useFormState: BuyForm.useFormState,
  useFormContext: BuyForm.useFormContext,
  useWatch: BuyForm.useWatch,
};

export { FormStopLossBuy };

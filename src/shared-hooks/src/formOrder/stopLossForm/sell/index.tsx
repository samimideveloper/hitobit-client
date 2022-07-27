import { SellForm } from "../types";
import { ControllerAmount } from "./controllerAmount";
import { ControllerSlider } from "./controllerSlider";
import { ControllerStopPrice } from "./controllerStopPrice";
import { ControllerTotal } from "./controllerTotal";
import { Provider } from "./provider";
import { useSubmit } from "./useSubmit";

const FormStopLossSell = {
  Provider,
  ControllerAmount,
  ControllerSlider,
  ControllerTotal,
  ControllerStopPrice,
  useSubmit,
  useFormState: SellForm.useFormState,
  useFormContext: SellForm.useFormContext,
  useWatch: SellForm.useWatch,
};

export { FormStopLossSell };

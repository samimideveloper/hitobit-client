import { SellForm } from "../types";
import { ControllerAmount } from "./controllerAmount";
import { ControllerPrice } from "./controllerPrice";
import { ControllerSlider } from "./controllerSlider";
import { ControllerStopPrice } from "./controllerStopPrice";
import { ControllerTotal } from "./controllerTotal";
import { Provider } from "./provider";
import { useSubmit } from "./useSubmit";

const FormStopLimitSell = {
  Provider,
  ControllerAmount,
  ControllerPrice,
  ControllerSlider,
  ControllerTotal,
  ControllerStopPrice,
  useSubmit,
  useWatch: SellForm.useWatch,
  useFormState: SellForm.useFormState,
  useFormContext: SellForm.useFormContext,
};

export { FormStopLimitSell };

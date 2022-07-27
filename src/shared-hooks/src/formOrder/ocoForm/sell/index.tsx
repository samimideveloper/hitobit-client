import { SellForm } from "../types";
import { ControllerAmount } from "./controllerAmount";
import { ControllerLimit } from "./controllerLimit";
import { ControllerPrice } from "./controllerPrice";
import { ControllerSlider } from "./controllerSlider";
import { ControllerStopPrice } from "./controllerStopPrice";
import { ControllerTotal } from "./controllerTotal";
import { Provider } from "./provider";
import { useSubmit } from "./useSubmit";

const FormOcoSell = {
  Provider,
  ControllerAmount,
  ControllerPrice,
  ControllerSlider,
  ControllerTotal,
  ControllerStopPrice,
  ControllerLimit,
  useSubmit,
  useWatch: SellForm.useWatch,
  useFormState: SellForm.useFormState,
  useFormContext: SellForm.useFormContext,
};

export { FormOcoSell };

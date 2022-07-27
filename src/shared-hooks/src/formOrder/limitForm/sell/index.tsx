import { SellForm } from "../types";
import { ControllerAmount } from "./controllerAmount";
import { ControllerPrice } from "./controllerPrice";
import { ControllerSlider } from "./controllerSlider";
import { ControllerTotal } from "./controllerTotal";
import { Provider } from "./provider";
import { useSubmit } from "./useSubmit";

const FormLimitSell = {
  Provider,
  ControllerAmount,
  ControllerPrice,
  ControllerSlider,
  ControllerTotal,
  useSubmit,
  useWatch: SellForm.useWatch,
  useFormState: SellForm.useFormState,
  useFormContext: SellForm.useFormContext,
};

export { FormLimitSell };

import { BuyForm } from "../types";
import { ControllerAmount } from "./controllerAmount";
import { ControllerPrice } from "./controllerPrice";
import { ControllerSlider } from "./controllerSlider";
import { ControllerTotal } from "./controllerTotal";
import { Provider } from "./provider";
import { useSubmit } from "./useSubmit";

const FormLimitBuy = {
  Provider,
  ControllerAmount,
  ControllerPrice,
  ControllerSlider,
  ControllerTotal,
  useSubmit,
  useWatch: BuyForm.useWatch,
  useFormState: BuyForm.useFormState,
  useFormContext: BuyForm.useFormContext,
};

export { FormLimitBuy };

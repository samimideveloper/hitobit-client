import { BuyForm } from "../types";
import { ControllerAmount } from "./controllerAmount";
import { ControllerLimit } from "./controllerLimit";
import { ControllerPrice } from "./controllerPrice";
import { ControllerSlider } from "./controllerSlider";
import { ControllerStopPrice } from "./controllerStopPrice";
import { ControllerTotal } from "./controllerTotal";
import { Provider } from "./provider";
import { useSubmit } from "./useSubmit";

const FormOcoBuy = {
  Provider,
  ControllerAmount,
  ControllerPrice,
  ControllerSlider,
  ControllerTotal,
  ControllerStopPrice,
  ControllerLimit,
  useSubmit,
  useWatch: BuyForm.useWatch,
  useFormState: BuyForm.useFormState,
  useFormContext: BuyForm.useFormContext,
};

export { FormOcoBuy };

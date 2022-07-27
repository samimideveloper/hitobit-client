import { BuyForm } from "../types";
import { ControllerAmount } from "./controllerAmount";
import { ControllerSlider } from "./controllerSlider";
import { ControllerTotal } from "./controllerTotal";
import { Provider } from "./provider";
import { useSubmit } from "./useSubmit";

const FormMarketBuy = {
  Provider,
  ControllerAmount,
  ControllerSlider,
  ControllerTotal,
  useSubmit,
  useFormState: BuyForm.useFormState,
  useFormContext: BuyForm.useFormContext,
  useWatch: BuyForm.useWatch,
};

export { FormMarketBuy };

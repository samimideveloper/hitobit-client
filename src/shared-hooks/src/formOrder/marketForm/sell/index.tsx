import { SellForm } from "../types";
import { ControllerAmount } from "./controllerAmount";
import { ControllerSlider } from "./controllerSlider";
import { ControllerTotal } from "./controllerTotal";
import { Provider } from "./provider";
import { useSubmit } from "./useSubmit";

const FormMarketSell = {
  Provider,
  ControllerAmount,
  ControllerSlider,
  ControllerTotal,
  useSubmit,
  useFormState: SellForm.useFormState,
  useFormContext: SellForm.useFormContext,
  useWatch: SellForm.useWatch,
};

export { FormMarketSell };

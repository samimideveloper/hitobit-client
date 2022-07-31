import { OrderAckInfoResponseVM, RequestError } from "hitobit-services";
import { createFormContext } from "react-hook-form-context";

export interface BuySellFormProps {
  spend?: string;
  recieve?: string;
  lastChangeInput?: "spend" | "recieve";
  selected?: string;
  shouldCharge?: boolean;
}

export type BuySellProps = {
  onSuccess?: (data: OrderAckInfoResponseVM) => void;
  onError?: (error: RequestError | Error | null) => void;
};

const buySellInitialValues: BuySellFormProps = {
  spend: "",
  recieve: "",
  lastChangeInput: undefined,
  selected: "",
  shouldCharge: false,
};

const BuySellContext = createFormContext(buySellInitialValues, "onChange");

const BuySellProvider = BuySellContext.Provider;

export { BuySellContext, BuySellProvider };

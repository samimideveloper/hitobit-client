import { createFormContext } from "react-hook-form-context";
import { OrderAckInfoResponseVM, RequestError } from "shared-services/src";

export interface ConvertFormProps {
  fromAmount?: string | null;
  fromAsset: string | undefined;
  toAmount?: string | null;
  toMarket: string | undefined;
  price?: string | null;
  lastChangedField?: "from" | "to";
}

export type ConvertProps = {
  onSuccess?: (data: OrderAckInfoResponseVM) => void;
  onError?: (error: RequestError | Error | null) => void;
};

const convertInitialValues: ConvertFormProps = {
  fromAsset: undefined,
  toMarket: undefined,
  fromAmount: null,
  toAmount: null,
  price: null,
  lastChangedField: undefined,
};

const ConvertContext = createFormContext(convertInitialValues, "onChange");

const ConvertProvider = ConvertContext.Provider;

export { ConvertContext, ConvertProvider };

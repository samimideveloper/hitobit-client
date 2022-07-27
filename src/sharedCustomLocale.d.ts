import "i18next";
import { Fa } from "mobile-core/src/i18n/locales/fa-IR";
import "react-i18next";
import fa from "web-core/src/i18n/messages/fa";

type CommonKeys = keyof typeof fa & keyof Fa;

declare module "react-i18next" {
  // and extend them!
  interface Resources {
    // typeof fa
    shared: Record<CommonKeys, string>;
  }

  type TFuncReturn<
    N,
    TKeys,
    TDefaultResult,
    TKPrefix = undefined,
    T = DefaultResources,
  > = string;
}
declare module "i18next" {
  // and extend them!
  interface TFunction {
    (key: CommonKeys, defaultValue?: string, options?: any): any;
  }

  type TFunctionResult<
    N,
    TKeys,
    TDefaultResult,
    TKPrefix = undefined,
    T = DefaultResources,
  > = any;
}

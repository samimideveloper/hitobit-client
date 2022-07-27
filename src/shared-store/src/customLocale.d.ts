import "i18next";
import "react-i18next";
import fa from "./i18n/messages/fa";
declare module "react-i18next" {
  // and extend them!
  interface Resources {
    // typeof fa
    translation: Record<keyof typeof fa, string>;
    server: Record<string, string>;
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
    (key: any, defaultValue?: string, options?: any): any;
  }

  type TFunctionResult<
    N,
    TKeys,
    TDefaultResult,
    TKPrefix = undefined,
    T = DefaultResources,
  > = any;
}

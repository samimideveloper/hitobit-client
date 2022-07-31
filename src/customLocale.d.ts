import { Fa } from "hitobit-modules/src/i18n/messages/fa";
import "i18next";
import "react-i18next";
declare module "react-i18next" {
  // and extend them
  interface Resources {
    // typeof fa
    translation: Record<keyof Fa, string>;
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
  type TFunctionResult = string;

  export interface TFunction {
    // basic usage
    <
      TResult extends TFunctionResult = string,
      TKeys extends keyof typeof fa = keyof typeof fa,
      TInterpolationMap extends object = StringMap,
    >(
      key: TKeys | TKeys[],
      options?: TOptions<TInterpolationMap> | string,
    ): string;
    // overloaded usage
    <
      TResult extends TFunctionResult = string,
      TKeys extends keyof typeof fa = keyof typeof fa,
      TInterpolationMap extends object = StringMap,
    >(
      key: TKeys | TKeys[],
      defaultValue?: string,
      options?: TOptions<TInterpolationMap> | string,
    ): string;
  }
}

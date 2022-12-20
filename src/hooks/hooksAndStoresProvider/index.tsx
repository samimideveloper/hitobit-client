import { MessageHeaders } from "@microsoft/signalr";
import { QueryClientProvider } from "@tanstack/react-query";
import { Fragment, lazy, ReactNode, useEffect } from "react";
import { initializeI18n } from "../../modules";
import { useGetPartyV1PublicDomainSetting } from "../../services";
import {
  AuthenticationProvider,
  baseCurrencyStore,
  BaseCurrencyStoreProvider,
  changeBaseCurrency,
  SelectedSymbolStoreProvider,
  setStoredAuthentication,
  setStoredBaseCurrency,
  setStoredSeletedSymbol,
} from "../../store";
import { kline } from "../kline";
import { queryClient } from "../queryClient";
import { UserSignalRConnectionProvider } from "../userSignalRConnection";

const UserManagerProvider = lazy(
  () => import("../../services/context/userManager"),
);

type Resource = Record<string, string>;
export interface ProvidersProps {
  children: ReactNode;
  fallback?: ReactNode;
  initializer?: () => Promise<void>;
  language?: "fa" | "en";
  i18nResources?: {
    fa: Resource;
    en: Resource;
  };
  userSignalRDependencies?: any[];
  userSignalRHeaders?: MessageHeaders;
}

const HitobitClientProvider = ({
  children,
  initializer,
  language,
  i18nResources,
  fallback,
  userSignalRDependencies,
  userSignalRHeaders,
}: ProvidersProps) => {
  const MaybeUserManagerProvider =
    typeof window === "undefined" ? Fragment : UserManagerProvider;

  return (
    <MaybeUserManagerProvider>
      <QueryClientProvider client={queryClient}>
        <AuthenticationProvider>
          <BaseCurrencyStoreProvider>
            <SelectedSymbolStoreProvider>
              <UserSignalRConnectionProvider
                dependencies={userSignalRDependencies}
                headers={userSignalRHeaders}
              >
                <kline.Provider>
                  <Child
                    {...{ initializer, language, i18nResources, fallback }}
                  >
                    {children}
                  </Child>
                </kline.Provider>
              </UserSignalRConnectionProvider>
            </SelectedSymbolStoreProvider>
          </BaseCurrencyStoreProvider>
        </AuthenticationProvider>
      </QueryClientProvider>
    </MaybeUserManagerProvider>
  );
};

const Child = ({
  children,
  initializer,
  language,
  i18nResources,
  fallback = null,
}: ProvidersProps) => {
  const dispatch = baseCurrencyStore.useDispatch();
  useGetPartyV1PublicDomainSetting({
    onSettled(data) {
      dispatch(
        changeBaseCurrency({
          asset:
            data?.defaultFiatCurrencySymbol || (__PRODUCTION__ ? "IRT" : "IRR"),
          fullName: "",
          status: "TRADING",
          symbol: "",
        }),
      );
    },
  });

  useEffect(() => {
    initializeI18n(language, i18nResources);
  }, [language, i18nResources]);
  useEffect(() => {
    const init = async () => {
      await setStoredAuthentication();
      await setStoredSeletedSymbol();
      await setStoredBaseCurrency();
      await initializer?.();
    };
    init();
  }, [initializer]);

  return <>{typeof window === "undefined" ? children : fallback}</>;
};

export { HitobitClientProvider };

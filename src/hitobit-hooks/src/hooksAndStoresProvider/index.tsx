import { initializeI18n } from "hitobit-modules";
import {
  AuthenticationProvider,
  BaseCurrencyStoreProvider,
  SelectedSymbolStoreProvider,
  setStoredAuthentication,
  setStoredBaseCurrency,
  setStoredSeletedSymbol,
} from "hitobit-store";
import { Fragment, lazy, ReactNode } from "react";
import { QueryClientProvider, useQuery } from "react-query";
import { kline } from "../kline";
import { queryClient } from "../queryClient";
import { UserSignalRConnection } from "../userSignalRConnection";

const UserManagerProvider = lazy(
  () => import("hitobit-services/dist/context/userManager"),
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
}

const HitobitClientProvider = ({
  children,
  initializer,
  language,
  i18nResources,
  fallback,
}: ProvidersProps) => {
  const MaybeUserManagerProvider =
    typeof window === "undefined" ? Fragment : UserManagerProvider;

  return (
    <MaybeUserManagerProvider>
      <QueryClientProvider client={queryClient}>
        <AuthenticationProvider>
          <BaseCurrencyStoreProvider>
            <SelectedSymbolStoreProvider>
              <UserSignalRConnection>
                <kline.Provider>
                  <Child
                    {...{ initializer, language, i18nResources, fallback }}
                  >
                    {children}
                  </Child>
                </kline.Provider>
              </UserSignalRConnection>
            </SelectedSymbolStoreProvider>
          </BaseCurrencyStoreProvider>
        </AuthenticationProvider>
      </QueryClientProvider>
    </MaybeUserManagerProvider>
  );
};

const ChildInitialSymbol = Symbol();

const Child = ({
  children,
  initializer,
  language,
  i18nResources,
  fallback = null,
}: ProvidersProps) => {
  const { data } = useQuery(
    [ChildInitialSymbol],
    async () => {
      await setStoredAuthentication();
      await setStoredSeletedSymbol();
      await setStoredBaseCurrency();
      initializeI18n(language, i18nResources);
      await initializer?.();
      return true;
    },
    {
      staleTime: Infinity,
    },
  );

  return <>{data || typeof window === "undefined" ? children : fallback}</>;
};

export { HitobitClientProvider };

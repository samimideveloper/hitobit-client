import { initializeI18n } from "hitobit-modules";
import {
  AuthenticationProvider,
  BaseCurrencyStoreProvider,
  SelectedSymbolStoreProvider,
  setStoredAuthentication,
  setStoredBaseCurrency,
  setStoredSeletedSymbol,
} from "hitobit-store";
import { Fragment, lazy } from "react";
import { QueryClientProvider, useQuery } from "react-query";
import { kline } from "../kline";
import { queryClient } from "../queryClient";
import { UserSignalRConnection } from "../userSignalRConnection";

const UserManagerProvider = lazy(
  () => import("hitobit-services/dist/context/userManager"),
);

export interface ProvidersProps {
  children: JSX.Element;
  initializer?: () => Promise<void>;
  language?: "fa" | "en";
}

const HitobitClientProvider = ({
  children,
  initializer,
  language,
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
                  <Child {...{ initializer, language }}>{children}</Child>
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

const Child = ({ children, initializer, language }: ProvidersProps) => {
  const { data } = useQuery(
    [ChildInitialSymbol],
    async () => {
      await setStoredAuthentication();
      await setStoredSeletedSymbol();
      await setStoredBaseCurrency();
      initializeI18n(language);
      await initializer?.();
      return true;
    },
    {
      staleTime: Infinity,
    },
  );

  return data || typeof window === "undefined" ? children : null;
};

export { HitobitClientProvider };

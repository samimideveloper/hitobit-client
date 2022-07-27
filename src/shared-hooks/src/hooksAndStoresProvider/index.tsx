import { Fragment, lazy } from "react";
import { QueryClientProvider, useQuery } from "react-query";
import { queryClient, UserSignalRConnection } from "shared-hooks";
import {
  AuthenticationProvider,
  BalanceVisibilityStoreProvider,
  BaseCurrencyStoreProvider,
  SelectedSymbolStoreProvider,
  setStoredAuthentication,
  setStoredBalance,
  setStoredBaseCurrency,
  setStoredSeletedSymbol,
} from "shared-store";
import { setStoredTheme, ThemeProvider } from "shared-theme";

const UserManagerProvider = lazy(
  () => import("shared-services/src/context/userManager"),
);

export interface ProvidersProps {
  children: JSX.Element;
}

const HooksAndStoresProvider = ({ children }: ProvidersProps) => {
  const MaybeUserManagerProvider =
    typeof window === "undefined" ? Fragment : UserManagerProvider;

  return (
    <MaybeUserManagerProvider>
      <QueryClientProvider client={queryClient}>
        <AuthenticationProvider>
          <ThemeProvider>
            <BaseCurrencyStoreProvider>
              <SelectedSymbolStoreProvider>
                <BalanceVisibilityStoreProvider>
                  <UserSignalRConnection>
                    <Child>{children}</Child>
                  </UserSignalRConnection>
                </BalanceVisibilityStoreProvider>
              </SelectedSymbolStoreProvider>
            </BaseCurrencyStoreProvider>
          </ThemeProvider>
        </AuthenticationProvider>
      </QueryClientProvider>
    </MaybeUserManagerProvider>
  );
};

const ChildInitialSymbol = Symbol();

const Child = ({ children }: ProvidersProps) => {
  const { data } = useQuery(
    [ChildInitialSymbol],
    async () => {
      await setStoredTheme();
      await setStoredAuthentication();
      await setStoredBalance();
      await setStoredSeletedSymbol();
      await setStoredBaseCurrency();
      return true;
    },
    {
      staleTime: Infinity,
    },
  );

  return data || typeof window === "undefined" ? children : null;
};

export { HooksAndStoresProvider };

import { PersistKey } from "hitobit-constants/src";
import { AsyncStorage } from "hitobit-modules";
import { SymbolStatus } from "hitobit-services";
import { ReactNode } from "react";
import { createReducer, createStore, Provider } from "react-principal";

const CHANGE_BASE_CURRENCY = Symbol();

interface InitialState {
  baseCurrency: {
    asset: string;
    status: SymbolStatus;
    symbol: string;
    fullName: string;
  };
}

const initialState: InitialState = {
  baseCurrency: {
    asset: "IRR",
    status: "TRADING",
    symbol: "",
    fullName: "",
  },
};

const reducer = createReducer<InitialState>({
  [CHANGE_BASE_CURRENCY]: (
    state: InitialState,
    { payload: { baseCurrency } }: { payload: InitialState },
  ) => ({
    ...state,
    baseCurrency,
  }),
});

export const baseCurrencyStore = createStore<InitialState>({
  reducer,
  initialState,
  storage: AsyncStorage,
  persistKey: PersistKey.BASE_CURRENCY,
  mapStateToPersist: (state) => state,
});

export const setStoredBaseCurrency = async () => {
  await baseCurrencyStore.setToState();
};

export const changeBaseCurrency = (
  baseCurrency: InitialState["baseCurrency"],
) => ({
  type: CHANGE_BASE_CURRENCY,
  payload: {
    baseCurrency,
  },
});

export const BaseCurrencyStoreProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  return <Provider store={baseCurrencyStore}>{children}</Provider>;
};

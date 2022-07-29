import {
  GetExchangeV1PublicKlinesQueryParams,
  persistKey,
} from "hitobit-services";
import { ReactNode } from "react";
import { createReducer, createStore, Provider } from "react-principal";

const CHANGE_SELECTED_SYMBOL = Symbol();
const CHANGE_INTERVAL = Symbol();

interface SelectedSymbolState {
  selectedSymbol?: {
    baseAsset: string;
    quoteAsset: string;
    symbol: string;
  };
  interval: Exclude<
    GetExchangeV1PublicKlinesQueryParams["interval"],
    | "ThreeMinutes"
    | "TwoHour"
    | "SixHour"
    | "EightHour"
    | "TwelveHour"
    | "ThreeDay"
    | undefined
  >;
}

const initialState: SelectedSymbolState = {
  selectedSymbol: undefined,
  interval: "OneHour",
};

const reducer = createReducer<SelectedSymbolState>({
  [CHANGE_SELECTED_SYMBOL]: (
    state: SelectedSymbolState,
    { payload: { selectedSymbol } }: { payload: SelectedSymbolState },
  ) => ({
    ...state,
    selectedSymbol,
  }),
  [CHANGE_INTERVAL]: (
    state: SelectedSymbolState,
    { payload: { interval } }: { payload: SelectedSymbolState },
  ) => ({
    ...state,
    interval,
  }),
});

export const selectedSymbolStore = createStore<SelectedSymbolState>({
  reducer,
  initialState,
  persistKey: persistKey.SELECTED_SYMBOL,
  mapStateToPersist: ({ interval }) => ({ interval }),
});

export const setStoredSeletedSymbol = async () => {
  await selectedSymbolStore.setToState();
};

export const changeSelectedSymbol = (
  selectedSymbol: SelectedSymbolState["selectedSymbol"],
) => ({
  type: CHANGE_SELECTED_SYMBOL,
  payload: {
    selectedSymbol,
  },
});
export const changeInterval = (interval: SelectedSymbolState["interval"]) => ({
  type: CHANGE_INTERVAL,
  payload: {
    interval,
  },
});

export const SelectedSymbolStoreProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  return <Provider store={selectedSymbolStore}>{children}</Provider>;
};

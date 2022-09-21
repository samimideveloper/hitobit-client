import { ReactNode } from "react";
import { createStore } from "react-principal";
import { PersistKey } from "../../constants";
import { AsyncStorage } from "../../modules";
import { initialState, InitialState } from "./initialState";
import reducer from "./reducers";

export const StoreAuthentication = createStore<InitialState>({
  reducer,
  initialState,
  persistKey: PersistKey.AUTHENTICATION,
  storage: AsyncStorage,
  mapStateToPersist: ({ signalRToken }) => ({
    signalRToken,
  }),
});

export const setStoredAuthentication = async () => {
  await StoreAuthentication.setToState();
};

export const getAuthenticationState = (): InitialState =>
  StoreAuthentication?.state;
export const getAuthenticationDispatch = () => StoreAuthentication.dispatch;

export const AuthenticationProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  return (
    <StoreAuthentication.Provider>{children}</StoreAuthentication.Provider>
  );
};

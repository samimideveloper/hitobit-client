import { createReducer } from "react-principal";
import { InitialState } from "./initialState";
import { SET_SIGNALR_TOKEN } from "./types";

export default createReducer<InitialState>({
  [SET_SIGNALR_TOKEN]: (state, { payload: { signalRToken } }) => ({
    ...state,
    signalRToken,
  }),
});

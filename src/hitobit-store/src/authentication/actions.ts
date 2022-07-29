import { SET_SIGNALR_TOKEN } from "./types";

function setSignalRToken(signalRToken: string) {
  return {
    type: SET_SIGNALR_TOKEN,
    payload: {
      signalRToken: {
        token: signalRToken,
        date: new Date().getTime(),
      },
    },
  };
}

export { setSignalRToken };

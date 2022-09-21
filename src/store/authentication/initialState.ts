export interface InitialState {
  signalRToken:
    | {
        token: string;
        date: number;
      }
    | undefined;
}

const initialState: InitialState = {
  signalRToken: undefined,
};

export { initialState };

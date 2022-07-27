import { createSignalRContext } from "react-signalr";

enum SignalREvents {
  SUBSCRIBE = "SUBSCRIBE",
  UNSUBSCRIBE = "UNSUBSCRIBE",
}
export type SignalRCallbacks = {
  [SignalREvents.SUBSCRIBE]: (message: string) => void;
  [SignalREvents.UNSUBSCRIBE]: (message: string) => void;
};

interface Hub {
  callbacksName: string;
  callbacks: SignalRCallbacks;
  methodsName: SignalREvents;
  methods: any;
}

const UserSignalRContext = createSignalRContext<Hub>({
  shareConnectionBetweenTab: false,
});

export { UserSignalRContext, SignalREvents };

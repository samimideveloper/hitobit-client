import hermes from "hermes-channel";
import { useEffect } from "react";
import { useEvent } from "reactjs-view-core";

export const useUserSignalREvent = (
  event: "executionReport" | "outboundAccountPosition" | "balanceUpdate",
  callback: (data: any) => void,
) => {
  const callbackRef = useEvent(callback);

  useEffect(() => {
    const _callback = (data: any) => callbackRef(data);
    hermes.on("userEvent_" + event, _callback);

    return () => hermes.off("userEvent_" + event, _callback);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

import { useLayoutEffect, useRef } from "react";
import { UseFormReturn } from "react-hook-form";
import { selectedSymbolStore } from "../../store";

const useResetOnSymbol = (useFormContext: () => UseFormReturn<any, object>) => {
  const { selectedSymbol } = selectedSymbolStore.useState();

  const { reset } = useFormContext();

  const isMounted = useRef<Boolean>(false);
  useLayoutEffect(() => {
    if (isMounted.current) {
      reset();
    }

    isMounted.current = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedSymbol?.symbol]);
};

export { useResetOnSymbol };

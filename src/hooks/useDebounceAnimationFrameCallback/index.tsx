import { useCallback, useRef } from "react";

const useDebounceAnimationFrameCallback = <T extends (...args: any) => void>(
  callback: T,
  deps: any[],
) => {
  const refTimeout = useRef<number>();

  return useCallback((...args: any) => {
    if (refTimeout.current) {
      cancelAnimationFrame(refTimeout.current);
    }
    refTimeout.current = requestAnimationFrame(() => callback(...args));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps) as T;
};

export { useDebounceAnimationFrameCallback };

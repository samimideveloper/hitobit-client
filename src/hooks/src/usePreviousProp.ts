import { useEffect, useRef } from "react";

export const usePreviousProp = <P>(props: P): P => {
  const ref = useRef<P>(props);

  useEffect(() => {
    ref.current = props;
  }, [props]);

  return ref.current;
};

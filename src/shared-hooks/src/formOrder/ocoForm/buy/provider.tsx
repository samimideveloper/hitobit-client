import { ReactNode } from "react";
import { BuyForm } from "../types";

const Provider = ({ children }: { children?: ReactNode | undefined }) => {
  return <BuyForm.Provider>{children}</BuyForm.Provider>;
};

export { Provider };

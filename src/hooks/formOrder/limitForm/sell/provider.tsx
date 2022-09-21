import { ReactNode } from "react";
import { SellForm } from "../types";

const Provider = ({ children }: { children?: ReactNode | undefined }) => {
  return <SellForm.Provider>{children}</SellForm.Provider>;
};

export { Provider };

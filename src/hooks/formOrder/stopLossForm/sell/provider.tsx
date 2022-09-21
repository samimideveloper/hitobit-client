import { useSelectOptions } from "../../useSelectOptions";
import { SellForm } from "../types";

export const Provider = ({ children }: { children: any }) => {
  const { options } = useSelectOptions();

  return (
    <SellForm.Provider
      defaultValues={{
        selectedOption: options[0],
      }}
    >
      {children}
    </SellForm.Provider>
  );
};

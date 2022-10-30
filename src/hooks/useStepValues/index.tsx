import starkString from "starkstring";
import { useStepSize } from "../useStepSize";

export const useStepValues = (symbol?: string) => {
  const { toStepSize } = useStepSize(symbol);

  const expectedValue = (value?: string | null) =>
    starkString(value || "")
      .parseNumber({ decimal: true })
      .toString();

  const onChangeValue = (_value?: string) => {
    const _numberedValue = starkString(_value || "")
      .parseNumber({ decimal: true })
      .toNumber();

    const _numberedStepValue = Number(
      toStepSize(
        starkString(_value || "")
          .parseNumber({ decimal: true })
          .toNumber(),
      ),
    );

    const _stepValue = toStepSize(
      starkString(_value || "")
        .parseNumber({ decimal: true })
        .toNumber(),
    );

    return _numberedValue > _numberedStepValue ? _stepValue : _value || "";
  };

  return { expectedValue, onChangeValue };
};

import { balanceVisibilityStore } from "shared-store";
import starkString from "starkstring";

const useDisplayBalance = () => {
  const { isVisible } = balanceVisibilityStore.useState();

  const hiddenContent = "********";

  return {
    displayBalance(
      balance: number | undefined,
      {
        prefix = "",
        suffix = "",
        showZeroWithDecimal,
      }: {
        prefix?: string;
        suffix?: string;
        showZeroWithDecimal?: { decimalCount: number };
      } = {},
    ) {
      return !isVisible
        ? hiddenContent
        : balance !== undefined
        ? `${prefix} ${
            showZeroWithDecimal && (balance === 0 || balance === undefined)
              ? getZeroValue({ showZeroWithDecimal })
              : starkString(balance).toCurrency().toString()
          } ${suffix}`.trim()
        : "";
    },
  };
};

export { useDisplayBalance };

const getZeroValue = ({
  showZeroWithDecimal,
}: {
  showZeroWithDecimal: { decimalCount: number };
}) => {
  const zero = "0";
  return `0.${zero.repeat(showZeroWithDecimal.decimalCount)}`;
};

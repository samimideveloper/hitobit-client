import { render, waitFor } from "@testing-library/react";
import i18n from "i18next";
import { View } from "reactjs-view";
import { useOrderPlacingError } from "..";
import { ConvertProvider, useErrorContext } from "../../convertForm";
import { HooksAndStoresProvider } from "../../hooksAndStoresProvider";
import { MarketTickerProvider } from "../../marketTicker";

describe("Home", () => {
  beforeAll(() => {
    i18n.init({
      resources: {
        fa: {
          translation: {},
        },
        en: {
          translation: {},
        },
      },
      lng: "en",
      fallbackLng: "fa",
      debug: true,
    });
    jest.useRealTimers();
  });
  const ValidTest = () => {
    const { getTotalError } = useOrderPlacingError();
    return (
      <>
        <View
          testID="test-valid"
          data-total-error={getTotalError({
            total: 5_000_000,
            symbol: "BTCIRR",
            side: "Buy",
          })}
          data-total-error-1={getTotalError({
            total: 3000000,
            symbol: "BTCIRR",
            side: "Buy",
          })}
          data-total-error-2={getTotalError({
            price: 10_000_000_000,
            total: 5_000_000_000,
            symbol: "BTCIRR",
            side: "Sell",
          })}
          data-total-error-3={getTotalError({
            price: 10_000_000_000,
            total: 4_000_000_000,
            symbol: "BTCIRR",
            side: "Sell",
          })}
          data-total-error-4={getTotalError({
            price: 9_400_000_000,
            total: 4_000_000_000,
            symbol: "BTCIRR",
            side: "Sell",
          })}
          data-total-error-5={getTotalError({
            price: 100_000_000_000,
            total: 20_000_000,
            symbol: "BTCIRR",
            side: "Sell",
          })}
          data-total-error-6={getTotalError({
            price: 9_400_000_000,
            total: 4_000_000,
            symbol: "BTCIRR",
            side: "Buy",
          })}
        ></View>
      </>
    );
  };
  const InvalidTest = () => {
    const errorMessages = useErrorContext();
    const { getTotalError } = useOrderPlacingError(errorMessages);
    return (
      <>
        <View
          testID="test-invalid"
          data-total-error={getTotalError({
            total: 10_000_000_000,
            symbol: "BTCIRR",
            side: "Buy",
          })}
          data-total-error-1={getTotalError({
            total: 3_000_000_000,
            symbol: "BTCIRR",
            side: "Buy",
          })}
          data-total-error-2={getTotalError({
            price: 9_000_000_000,
            total: 5_000_000_000,
            symbol: "BTCIRR",
            side: "Sell",
          })}
          data-total-error-3={getTotalError({
            price: 10_000_000_000,
            total: 5000,
            symbol: "BTCIRR",
            side: "Buy",
          })}
          data-total-error-4={getTotalError({
            price: 10_000_000_000,
            total: 5000,
            symbol: "BTCIRR",
            side: "Sell",
          })}
          data-total-error-5={getTotalError({
            total: 1_000_000_000_000,
            symbol: "BTCIRR",
            side: "Buy",
          })}
        ></View>
      </>
    );
  };

  /* Consider than user has 1_000_000_000 IRR , 0.5 BTC and the btc price is 10_000_000_000*/

  test("Valid Order Placement", async () => {
    const instance = render(
      <HooksAndStoresProvider>
        <MarketTickerProvider>
          <ValidTest />
        </MarketTickerProvider>
      </HooksAndStoresProvider>,
    );
    await waitFor(() => sleep(500), { timeout: 2000 });
    const data = await waitFor(() => instance.getByTestId("test-valid"));
    expect(data.getAttribute("data-total-error")).toBe(null);
    expect(data.getAttribute("data-total-error-1")).toBe(null);
    expect(data.getAttribute("data-total-error-2")).toBe(null);
    expect(data.getAttribute("data-total-error-3")).toBe(null);
    expect(data.getAttribute("data-total-error-4")).toBe(null);
    expect(data.getAttribute("data-total-error-5")).toBe(null);
    expect(data.getAttribute("data-total-error-6")).toBe(null);
  });
  test("Invalid Order Placement", async () => {
    const instance = render(
      <HooksAndStoresProvider>
        <MarketTickerProvider>
          <ConvertProvider
            errors={{
              INSUFFICIENT_BALANCE_FUND: i18n.t(
                "insufficientBalancePleaseFund",
              ),
              INSUFFICIENT_BALANCE: i18n.t("insufficientBalance"),
              PRICE_LESS_THAN_MIN_PRICE: i18n.t(
                "priceShouldBeMoreThanMinPrice",
                { minPrice: 2000000 },
              ),
            }}
          >
            <InvalidTest />
          </ConvertProvider>
        </MarketTickerProvider>
      </HooksAndStoresProvider>,
    );
    await waitFor(() => sleep(500), { timeout: 2000 });
    const data = await waitFor(() => instance.getByTestId("test-invalid"));
    expect(data.getAttribute("data-total-error")).toBe(
      i18n.t("insufficientBalancePleaseFund"),
    );
    expect(data.getAttribute("data-total-error-1")).toBe(
      i18n.t("insufficientBalancePleaseFund"),
    );
    expect(data.getAttribute("data-total-error-2")).toBe(
      i18n.t("insufficientBalance"),
    );
    expect(data.getAttribute("data-total-error-3")).toBe(
      i18n.t("priceShouldBeMoreThanMinPrice", { minPrice: 2000000 }),
    );
    expect(data.getAttribute("data-total-error-4")).toBe(
      i18n.t("priceShouldBeMoreThanMinPrice", { minPrice: 2000000 }),
    );
  });
});
const sleep = (time: number) =>
  new Promise((resolve) => setTimeout(resolve, time));

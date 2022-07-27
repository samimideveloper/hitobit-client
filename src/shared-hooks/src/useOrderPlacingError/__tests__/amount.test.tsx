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
    const { getAmountError } = useOrderPlacingError();
    return (
      <>
        <View
          testID="test-valid"
          data-amount-error-1={getAmountError({
            baseQuantity: 0.001,
            symbol: "BTCIRR",
            side: "Buy",
          })}
          data-amount-error-2={getAmountError({
            baseQuantity: 0.0001,
            price: 9_000_000_000,
            symbol: "BTCIRR",
            side: "Buy",
          })}
          data-amount-error-3={getAmountError({
            baseQuantity: 0.4,
            price: 10_000_000_000,
            symbol: "BTCIRR",
            side: "Sell",
          })}
          data-amount-error-4={getAmountError({
            baseQuantity: 0.5,
            symbol: "BTCIRR",
            side: "Sell",
          })}
          data-amount-error-5={getAmountError({
            baseQuantity: 0.0001,
            price: 10_000_000_000,
            symbol: "BTCIRR",
            side: "Sell",
          })}
          data-amount-error-6={getAmountError({
            baseQuantity: 0.0001,
            price: 10_000_000_000,
            symbol: "BTCIRR",
            side: "Sell",
          })}
        ></View>
      </>
    );
  };
  const InvalidTest = () => {
    const errorMessages = useErrorContext();
    const { getAmountError } = useOrderPlacingError(errorMessages);
    return (
      <>
        <View
          testID="test-invalid"
          data-amount-error-1={getAmountError({
            baseQuantity: 10,
            symbol: "BTCIRR",
            side: "Buy",
          })}
          data-amount-error-2={getAmountError({
            baseQuantity: 0.6,
            symbol: "BTCIRR",
            side: "Sell",
          })}
          data-amount-error-3={getAmountError({
            baseQuantity: 2,
            price: 900000000,
            symbol: "BTCIRR",
            side: "Buy",
          })}
          data-amount-error-4={getAmountError({
            baseQuantity: 0.000001,
            price: 10_000_000_000,
            symbol: "BTCIRR",
            side: "Sell",
          })}
          data-amount-error-5={getAmountError({
            baseQuantity: 10000,
            price: 10_000_000_000,
            symbol: "BTCIRR",
            side: "Sell",
          })}
        ></View>
      </>
    );
  };

  /* Consider that user has 1_000_000_000 IRR , 0.5 BTC and the btc price is 10_000_000_000 IRR*/

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
    expect(data.getAttribute("data-amount-error-1")).toBe(null);
    expect(data.getAttribute("data-amount-error-2")).toBe(null);
    expect(data.getAttribute("data-amount-error-3")).toBe(null);
    expect(data.getAttribute("data-amount-error-4")).toBe(null);
    expect(data.getAttribute("data-amount-error-5")).toBe(null);
    expect(data.getAttribute("data-amount-error-6")).toBe(null);
  });
  test("invalid Order Placement", async () => {
    const instance = render(
      <HooksAndStoresProvider>
        <MarketTickerProvider>
          <ConvertProvider
            errors={{
              INSUFFICIENT_BALANCE: i18n.t("insufficientBalance"),
              AMOUNT_LESS_THAN_MIN_PRICE: i18n.t(
                "valueShouldBeMoreThanMinPrice",
                { minPrice: "0.00001" },
              ),
              AMOUNT_MORE_THAN_MAX_PRICE: i18n.t(
                "valueShouldBeLessThanMaxPrice",
                { maxPrice: "9000" },
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
    expect(data.getAttribute("data-amount-error-1")).toBe(
      i18n.t("insufficientBalance"),
    );
    expect(data.getAttribute("data-amount-error-2")).toBe(
      i18n.t("insufficientBalance"),
    );
    expect(data.getAttribute("data-amount-error-3")).toBe(
      i18n.t("insufficientBalance"),
    );
    expect(data.getAttribute("data-amount-error-4")).toBe(
      i18n.t("valueShouldBeMoreThanMinPrice", { minPrice: "0.00001" }),
    );
    expect(data.getAttribute("data-amount-error-5")).toBe(
      i18n.t("valueShouldBeLessThanMaxPrice", { maxPrice: "9000" }),
    );
  });
});
const sleep = (time: number) =>
  new Promise((resolve) => setTimeout(resolve, time));

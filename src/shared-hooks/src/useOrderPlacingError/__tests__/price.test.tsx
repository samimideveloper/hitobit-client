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
    const { getPriceError } = useOrderPlacingError();
    return (
      <>
        <View
          testID="test-valid"
          data-price-error={getPriceError({
            price: 10_000_000,
            symbol: "BTCIRR",
          })}
          data-price-error-1={getPriceError({
            price: 20_000_000,
            symbol: "BTCIRR",
          })}
          data-price-error-2={getPriceError({
            price: 20_000_000,
            symbol: "BTCIRR",
          })}
          data-price-error-3={getPriceError({
            price: 20_000_000,
            symbol: "BTCIRR",
          })}
          data-price-error-4={getPriceError({
            price: 20_000_000,
            symbol: "BTCIRR",
          })}
          data-price-error-5={getPriceError({
            price: 20_000_000,
            symbol: "BTCIRR",
          })}
          data-price-error-6={getPriceError({
            price: 20_000_000,
            symbol: "BTCIRR",
          })}
        ></View>
      </>
    );
  };
  const InvalidTest = () => {
    const errorMessages = useErrorContext();
    const { getPriceError } = useOrderPlacingError(errorMessages);
    return (
      <>
        <View
          testID="test-invalid"
          data-price-error={getPriceError({
            price: 0.0000000001,
            symbol: "BTCIRR",
          })}
          data-price-error-1={getPriceError({
            price: 99900000000000,
            symbol: "BTCIRR",
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
    expect(data.getAttribute("data-price-error")).toBe(null);
    expect(data.getAttribute("data-price-error-1")).toBe(null);
    expect(data.getAttribute("data-price-error-2")).toBe(null);
    expect(data.getAttribute("data-price-error-3")).toBe(null);
    expect(data.getAttribute("data-price-error-4")).toBe(null);
    expect(data.getAttribute("data-price-error-5")).toBe(null);
    expect(data.getAttribute("data-price-error-6")).toBe(null);
  });
  test("invalid Order Placement", async () => {
    const instance = render(
      <HooksAndStoresProvider>
        <MarketTickerProvider>
          <ConvertProvider
            errors={{
              PRICE_LESS_THAN_MIN_PRICE: i18n.t(
                "priceShouldBeMoreThanMinPrice",
                { minPrice: 0.0001 },
              ),
              PRICE_MORE_THAN_MAX_PRICE: i18n.t(
                "priceShouldBeLessThanMaxPrice",
                { maxPrice: 250000000000 },
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
    expect(data.getAttribute("data-price-error")).toBe(
      i18n.t("priceShouldBeMoreThanMinPrice", { minPrice: 0.0001 }),
    );
    expect(data.getAttribute("data-price-error-1")).toBe(
      i18n.t("priceShouldBeLessThanMaxPrice", { maxPrice: 250000000000 }),
    );
  });
});
const sleep = (time: number) =>
  new Promise((resolve) => setTimeout(resolve, time));

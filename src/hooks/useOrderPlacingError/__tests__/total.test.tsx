import { render, waitFor } from "@testing-library/react";
import { useOrderPlacingError } from "..";
import { i18n } from "../../../modules";
import { ConvertProvider } from "../../convertForm";
import { HitobitClientProvider } from "../../hooksAndStoresProvider";
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
        <div
          data-testid="test-valid"
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
        ></div>
      </>
    );
  };
  const InvalidTest = () => {
    const { getTotalError } = useOrderPlacingError();
    return (
      <>
        <div
          data-testid="test-invalid"
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
        ></div>
      </>
    );
  };

  /* Consider than user has 1_000_000_000 IRR , 0.5 BTC and the btc price is 10_000_000_000*/

  test("Valid Order Placement", async () => {
    const instance = render(
      <HitobitClientProvider>
        <MarketTickerProvider>
          <ValidTest />
        </MarketTickerProvider>
      </HitobitClientProvider>,
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
      <HitobitClientProvider>
        <MarketTickerProvider>
          <ConvertProvider>
            <InvalidTest />
          </ConvertProvider>
        </MarketTickerProvider>
      </HitobitClientProvider>,
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
      i18n.t("priceShouldBeMoreThanMinPrice", { minPrice: "2,000,000" }),
    );
    expect(data.getAttribute("data-total-error-4")).toBe(
      i18n.t("priceShouldBeMoreThanMinPrice", { minPrice: "2,000,000" }),
    );
  });
});
const sleep = (time: number) =>
  new Promise((resolve) => setTimeout(resolve, time));

import { render, waitFor } from "@testing-library/react";
import { initializeI18n } from "shared-modules/src";
import { useSymbolPrice } from "..";
import { HitobitClientProvider } from "../../hooksAndStoresProvider";

describe("useSymbolPrice", () => {
  beforeAll(() => {
    initializeI18n("en");
    jest.useRealTimers();
  });
  const ValidTest = () => {
    const {
      price,
      price24hChangePercent,
      priceWeekChangePercent,
      priceMonthChangePercent,
    } = useSymbolPrice("BTCUSDT");

    return (
      <div
        data-testid="test-valid"
        data-price={price}
        data-24h-percent={price24hChangePercent}
        data-week-percent={priceWeekChangePercent}
        data-month-percent={priceMonthChangePercent}
      ></div>
    );
  };

  /* Consider that user has 1_000_000_000 IRR , 0.5 BTC and the btc price is 10_000_000_000 IRR*/

  test("validate", async () => {
    const instance = render(
      <HitobitClientProvider>
        <ValidTest />
      </HitobitClientProvider>,
    );

    await waitFor(() => sleep(500), { timeout: 2000 });

    const data = await waitFor(() => instance.getByTestId("test-valid"));

    expect(data.getAttribute("data-price")).toBe(`${10_000_000_000}`);
    expect(data.getAttribute("data-24h-percent")).toBe("11.11");
    expect(data.getAttribute("data-week-percent")).toBe("-9.09");
    expect(data.getAttribute("data-month-percent")).toBe("0");
  });
});

const sleep = (time: number) =>
  new Promise((resolve) => setTimeout(resolve, time));

import { render, waitFor } from "@testing-library/react";
import i18next from "i18next";
import { View } from "reactjs-view";
import { useSymbolPrice } from "..";
import { HooksAndStoresProvider } from "../../hooksAndStoresProvider";

describe("useSymbolPrice", () => {
  beforeAll(() => {
    i18next.init({
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
    const {
      price,
      price24hChangePercent,
      priceWeekChangePercent,
      priceMonthChangePercent,
    } = useSymbolPrice("BTCUSDT");

    return (
      <View
        testID="test-valid"
        data-price={price}
        data-24h-percent={price24hChangePercent}
        data-week-percent={priceWeekChangePercent}
        data-month-percent={priceMonthChangePercent}
      ></View>
    );
  };

  /* Consider that user has 1_000_000_000 IRR , 0.5 BTC and the btc price is 10_000_000_000 IRR*/

  test("validate", async () => {
    const instance = render(
      <HooksAndStoresProvider>
        <ValidTest />
      </HooksAndStoresProvider>,
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

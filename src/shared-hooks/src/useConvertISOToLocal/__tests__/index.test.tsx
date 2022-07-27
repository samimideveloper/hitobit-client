import { render } from "@testing-library/react";
import i18next from "i18next";
import moment from "moment-jalaali";
//@ts-ignore
import fa from "moment/locale/fa";
import { initReactI18next } from "react-i18next";
import { useConvertISOToLocal } from "..";

i18next.use(initReactI18next);

function TestComp() {
  const { convertISOToLocal } = useConvertISOToLocal();

  const toHumanistDate = convertISOToLocal(
    moment().subtract(3, "month").toISOString(),
  );

  const converted = convertISOToLocal("2022-03-12T07:32:14.442Z");
  return (
    <p
      data-testid="test"
      data-human={toHumanistDate.human}
      data-datetime={converted.dateTime}
      data-date={converted.date}
      data-year={converted.year}
      data-month={converted.month}
      data-day={converted.day}
      data-time={converted.time}
    />
  );
}

describe("useConvertISOToLocal fa", () => {
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
      lng: "fa",
      fallbackLng: "fa",
      debug: true,
    });
    moment.updateLocale("fa", fa);
    moment.loadPersian();
  });

  test("test useHumanistDate", () => {
    const component = render(<TestComp />);
    const tree = component.getByTestId("test");
    expect(tree.getAttribute("data-human")).toEqual("3 ماه پیش");
    expect(tree.getAttribute("data-date")).toEqual("1400/12/21");
    expect(tree.getAttribute("data-datetime")).toEqual("1400/12/21 11:02");
    expect(tree.getAttribute("data-time")).toEqual("11:02");
    expect(tree.getAttribute("data-year")).toEqual("1400");
    expect(tree.getAttribute("data-month")).toEqual("اسفند");
    expect(tree.getAttribute("data-day")).toEqual("21");
  });
});

describe("useConvertISOToLocal en", () => {
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
    moment.locale("en");
  });

  test("test useHumanistDate", () => {
    const component = render(<TestComp />);
    const tree = component.getByTestId("test");
    expect(tree.getAttribute("data-human")).toEqual("3 months ago");
    expect(tree.getAttribute("data-date")).toEqual("2022/12/03");
    expect(tree.getAttribute("data-datetime")).toEqual("2022/12/03 11:02");
    expect(tree.getAttribute("data-time")).toEqual("11:02");
    expect(tree.getAttribute("data-year")).toEqual("2022");
    expect(tree.getAttribute("data-month")).toEqual("March");
    expect(tree.getAttribute("data-day")).toEqual("12");
  });
});

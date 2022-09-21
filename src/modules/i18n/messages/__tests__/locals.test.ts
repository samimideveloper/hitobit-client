import en from "../en";
import fa from "../fa";

describe("Localization", () => {
  const englishKeys = Object.keys(en).sort();
  const farsiKeys = Object.keys(fa).sort();

  it("English keys should be in Farsi", () => {
    expect(farsiKeys).toStrictEqual(englishKeys);
  });
});

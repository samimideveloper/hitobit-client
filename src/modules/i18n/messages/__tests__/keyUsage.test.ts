import fs from "fs";
import { join, resolve } from "path";
import fa from "../fa";

function throwError(
  key: string,
  mode: "notFound" | "notUsed",
  componentDir: string,
  file: string,
  resolver: (...dirs: string[]) => string,
) {
  const error = new Error(
    mode === "notUsed"
      ? `(i18n key usage Rules): the key '${key}' is not used anywhere please remove it from translation file or use it somewhere `
      : `(i18n key usage Rules): the key '${key}' is not translated please add it to translation file or remove it from component`,
  );

  error.stack = `Error:\nat (${resolver(componentDir, file)})\n`;
  test(componentDir, () =>
    expect(() => {
      throw error;
    }).not.toThrow(),
  );
}

function recursiveChecker(
  componentDir: string,
  resolver: (...dirs: string[]) => string,
) {
  const result = new Set<string>();
  const files = fs.readdirSync(resolver(componentDir));

  files.forEach((file) => {
    if (fs.lstatSync(resolver(componentDir, file)).isDirectory()) {
      const res = recursiveChecker(join(componentDir, file), resolver);
      res.forEach((key) => result.add(key));
      return;
    }

    if (!file.match(/(tsx?|ts?)$/g)) {
      return [];
    }
    const content = fs.readFileSync(resolver(componentDir, file)).toString();
    const rgx = new RegExp(
      /\bt\("([a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+)"/g,
    );
    const keysWithT = content.match(rgx);
    keysWithT?.forEach((key) => {
      const replacedKey = key.replace(rgx, "$1");
      result.add(replacedKey);

      const languageKeys = new Set<string>(
        Object.keys(fa).sort((a, b) => a.localeCompare(b)),
      );
      const notFound = !languageKeys.has(replacedKey);

      if (notFound)
        throwError(replacedKey, "notFound", componentDir, file, resolver);
    });
  });

  return result;
}

function checkKeyUsage(dirname: string) {
  const resolver = (...dirs: string[]) =>
    resolve(dirname, `../../../../../`, ...dirs);

  describe("", () => {
    const res = new Set(
      [...recursiveChecker(resolver(""), resolver)].sort((a, b) =>
        a.localeCompare(b),
      ),
    );
    const languageKeys = new Set<string>(
      Object.keys(fa).sort((a, b) => a.localeCompare(b)),
    );
    const notUsed = [...languageKeys.values()].filter((key) => !res.has(key));
    notUsed.forEach((key) => {
      throwError(key, "notUsed", dirname, "", resolver);
    });
  });
  it("fake", () => {
    expect(true).toBe(true);
  });
}

checkKeyUsage(__dirname);
//

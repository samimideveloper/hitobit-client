import { getCookie, removeCookies, setCookies } from "cookies-next";
import { OptionsType } from "cookies-next/lib/types";
import { CookiePersistKey } from "../persistKey";

let serverSideCookiesOptions: OptionsType;
const cookieStorage = {
  init(options: OptionsType) {
    serverSideCookiesOptions = options;
  },

  setItem<T>(key: keyof typeof CookiePersistKey, data: T) {
    setCookies(CookiePersistKey[key], data, serverSideCookiesOptions);
  },

  getItem(key: keyof typeof CookiePersistKey): string | undefined {
    const cookie = getCookie(CookiePersistKey[key], serverSideCookiesOptions);
    return cookie?.toString();
  },

  removeItem(key: keyof typeof CookiePersistKey) {
    removeCookies(CookiePersistKey[key], serverSideCookiesOptions);
  },

  clear() {
    (
      Object.keys(CookiePersistKey) as (keyof typeof CookiePersistKey)[]
    ).forEach((key) => {
      const cookie = getCookie(CookiePersistKey[key], serverSideCookiesOptions);
      if (cookie) {
        removeCookies(key, serverSideCookiesOptions);
      }
    });
  },
};

export { cookieStorage };

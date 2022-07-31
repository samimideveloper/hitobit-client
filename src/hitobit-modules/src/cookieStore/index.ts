import { getCookie, removeCookies, setCookie } from "cookies-next";
import { OptionsType } from "cookies-next/lib/types";
import { PersistKey } from "hitobit-constants";

let serverSideCookiesOptions: OptionsType;
const cookieStorage = {
  init(options: OptionsType) {
    serverSideCookiesOptions = options;
  },

  setItem<T>(key: keyof typeof PersistKey, data: T) {
    setCookie(PersistKey[key], data, serverSideCookiesOptions);
  },

  getItem(key: keyof typeof PersistKey): string | undefined {
    const cookie = getCookie(PersistKey[key], serverSideCookiesOptions);
    return cookie?.toString();
  },

  removeItem(key: keyof typeof PersistKey) {
    removeCookies(PersistKey[key], serverSideCookiesOptions);
  },

  clear() {
    (Object.keys(PersistKey) as (keyof typeof PersistKey)[]).forEach((key) => {
      const cookie = getCookie(PersistKey[key], serverSideCookiesOptions);
      if (cookie) {
        removeCookies(key, serverSideCookiesOptions);
      }
    });
  },
};

export { cookieStorage };

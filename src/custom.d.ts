declare namespace globalThis {
  export const __CLIENT_SECRET__: string;
  export const __CLIENT_ID__: string;
  export const __STAGE__: boolean;
  export const __STAGE_TEST__: boolean;
  export const __PLATFORM__: "web" | "native" | "pwa";
  export const __TESTNET__: boolean;
  export const __DEV__: boolean;
  export const __MOCK__: boolean;
}

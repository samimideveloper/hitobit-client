import type { AsyncStorageStatic } from "@react-native-community/async-storage";

const AsyncStorage =
  typeof window === "undefined"
    ? undefined
    : (localStorage as unknown as AsyncStorageStatic);
export { AsyncStorage };

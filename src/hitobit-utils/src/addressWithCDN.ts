import { getCDNBaseUrl } from "hitobit-constants";

export const addressWithCDN = (src = ""): string => {
  return `${getCDNBaseUrl()}/${src.replace("\\", "//")}`;
};

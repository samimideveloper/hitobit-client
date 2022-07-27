import { getCDNBaseUrl } from "shared-constants";

export const addressWithCDN = (src = ""): string => {
  return `${getCDNBaseUrl()}/${src.replace("\\", "//")}`;
};

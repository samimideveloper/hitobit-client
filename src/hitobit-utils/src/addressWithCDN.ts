import { URLManager } from "hitobit-modules";

export const addressWithCDN = (src = ""): string => {
  return `${URLManager.CDNBaseUrl}/${src.replace("\\", "//")}`;
};

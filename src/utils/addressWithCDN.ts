import { URLManager } from "../modules";

export const addressWithCDN = (src = ""): string => {
  return `${URLManager.CDNBaseUrl}/${src.replace("\\", "//")}`;
};

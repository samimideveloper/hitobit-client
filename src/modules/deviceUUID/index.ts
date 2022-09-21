import { v4 as uuid } from "uuid";

let deviceId: string | undefined;

const getDeviceId = () => {
  if (typeof window === "undefined") return "";
  if (deviceId) {
    return deviceId;
  }

  const customData = localStorage.getItem("customUniqData");

  if (customData) {
    deviceId = customData;
  }
  if (!deviceId) {
    deviceId = uuid();
  }

  localStorage.setItem("customUniqData", deviceId);

  return deviceId;
};

export { getDeviceId };

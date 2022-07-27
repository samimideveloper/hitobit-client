import { getDeviceId as getDeviceIdInfo } from "react-native-device-info";

const getDeviceId = () => {
  const id = getDeviceIdInfo();
  return id;
};

export { getDeviceId };

import MockAdapter from "axios-mock-adapter";
import { getAxiosInstance } from "hitobit-services/src/services/config";

let mock: MockAdapter;
// Mock any GET request to /users
// arguments for reply are (status, data, headers)
export const getMockAdapter = () => {
  if (!mock) {
    mock = new MockAdapter(getAxiosInstance({}));
  }

  return mock;
};

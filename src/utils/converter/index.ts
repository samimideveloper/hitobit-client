import moment from "moment-jalaali";
import starkString from "starkstring";

function getUniqNumberOfDay(dateTime: string, format?: string) {
  return moment(dateTime, format).startOf("day").toDate().getTime();
}

function normalizePhoneNumber(phoneNumber?: string) {
  if (!phoneNumber) {
    return;
  }
  phoneNumber = phoneNumber.trim().replace(/^((\+98)|(0)|98|)9/g, "989");

  return phoneNumber;
}

const decodeBase64 = (data: string) => `data:image/jpeg;base64,${data}`;

const paddingDecimalNumber = (
  input: string | number | undefined,
  countOfAllNumber: number,
) => {
  input = input || 0;

  return starkString(input)
    .toDecimalPrecision(countOfAllNumber)
    .toCurrency()
    .toString();
};

export {
  decodeBase64,
  paddingDecimalNumber,
  normalizePhoneNumber,
  getUniqNumberOfDay,
};

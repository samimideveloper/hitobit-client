import { RequestError } from "hitobit-services/src/services/config";
import i18n from "i18next";

function isError(error: RequestError | unknown): error is RequestError {
  return !!error;
}

/**
 * Get message of error
 *
 * @param error
 * @param propertyName Get specific property error message, give you global
 *   message if not set
 * @returns
 */
export const getErrorMessage = (
  error: RequestError | unknown,
  propertyName?: string,
) => {
  if (!isError(error)) {
    return "";
  }

  if (RequestError.isApiException(error)) {
    if (propertyName) {
      const message = error.errors?.find(
        ({ property }) =>
          (property as string).toLowerCase() === propertyName.toLowerCase(),
      )?.message;

      if (!message) {
        return "";
      }

      return message;
    }
  }

  return error.message || i18n.t("errorOccurred");
};

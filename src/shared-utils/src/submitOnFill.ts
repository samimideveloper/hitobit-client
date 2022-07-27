interface Params {
  firstValue?: string;
  secondValue?: string;
  isFirstNeeded?: boolean;
  isSecondNeeded?: boolean;
  lengthToCheck?: number;
}
export const submitOnFill = ({
  firstValue,
  secondValue,
  isFirstNeeded,
  isSecondNeeded,
  lengthToCheck = 6,
}: Params): boolean => {
  const verificationCodeLength = Number(firstValue?.length || 0);
  const authenticationCodeLength = Number(secondValue?.length || 0);

  if (
    (isSecondNeeded &&
      isFirstNeeded &&
      verificationCodeLength !== lengthToCheck &&
      authenticationCodeLength !== lengthToCheck) ||
    (isSecondNeeded && authenticationCodeLength !== lengthToCheck) ||
    (isFirstNeeded && verificationCodeLength !== lengthToCheck)
  ) {
    return false;
  }
  return true;
};

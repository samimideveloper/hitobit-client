export const isMobileValid = (mobile = ""): boolean => {
  const regex = /^((0|\+98|98|)(9)([0-9]{9}))$/;
  return regex.test(String(mobile));
};

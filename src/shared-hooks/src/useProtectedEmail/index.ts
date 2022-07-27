const useProtectedEmail = (email: string | undefined): string | undefined => {
  const splitEmail = email?.split("@");
  const domain = splitEmail?.[1];
  const name = splitEmail?.[0];
  return name
    ?.substring(0, 3)
    .concat(Array.from({ length: name.length - 3 }, () => "*").join(""))
    .concat("@")
    .concat(domain || "");
};

export { useProtectedEmail };

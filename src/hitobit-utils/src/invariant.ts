export function invariant(
  condition: boolean | null | undefined | string,
  message: string,
) {
  if (!condition && __DEV__) {
    throw new Error(message);
  }
}

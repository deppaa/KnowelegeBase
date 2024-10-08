export const checkValidStringToNumber = (
  value: string | string[] | number,
): boolean =>
  Array.isArray(value)
    ? value.every((value) => checkValidStringToNumber(value))
    : !isNaN(Number(value));

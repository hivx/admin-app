export const mapUndefinedOrEmptyStringToNull = (input: unknown) =>
  typeof input === 'undefined' || (typeof input === 'string' && !input.length)
    ? null
    : input;

export const mapNullOrEmptyStringToUndefined = (input: unknown) =>
  input === null || (typeof input === 'string' && !input.length) ? undefined : input;

/**
 * Clean undefined values from object
 */
export const cleanObject = (input: Record<string, unknown>) => {
  Object.entries(input).forEach(([key, val]) => {
    if (val === undefined) {
      delete input[key];
    }
  });
  return input;
};

/**
 * @example
 * isJsonObject(1234)             // —» false
 * isJsonObject('true')             // —» false
 * isJsonObject('{"x":true}')       // —» true
 * isJsonObject('[1, false, null]') // —» false
 */
export const isJsonObject = (input: unknown): boolean => {
  // not a string, discard result
  if (typeof input !== 'string') return false;
  try {
    const result = JSON.parse(input);
    const type = Object.prototype.toString.call(result);
    return type === '[object Object]';
  } catch (err) {
    return false;
  }
};

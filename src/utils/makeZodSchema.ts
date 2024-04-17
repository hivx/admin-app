import { toZod } from 'tozod';

export function makeZodSchema<T>(fn: () => toZod<T>): toZod<T> {
  return fn();
}

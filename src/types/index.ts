import { toZod } from 'tozod';

import { TranslationFunctions } from '@/locales/i18n-types';

export type BaseEntity = {
  id: number;
};

export type Voidable = {
  voided: boolean;
};
/**
 * Xác định có xóa hẳn khỏi database hay không
 */
export type Purgeable = {
  purge: boolean;
};

// make all properties in a type nullable
export type NullableDeep<T> = { [K in keyof T]: NullableDeep<T[K]> | null };
// make all shallow properties in a type nullable
export type Nullable<T> = { [K in keyof T]: T[K] | null };
// remove null type from object properties
export type NonNullableObject<T> = { [K in keyof T]: NonNullable<T[K]> };
export type PickNonNullable<T, K extends keyof T> = NonNullableObject<Pick<T, K>>;

// make all shallow properties in a type string-able
export type Stringable<T> = { [K in keyof T]: string };

export type NotIn<T> = Record<keyof T, never>;

export type IZodSchemaCreator = <T>(translate: TranslationFunctions) => toZod<T>;

export enum BUTTON_STATE {
  ACTIVE = 'ACTIVE',
  DISABLED = 'DISABLED',
  HIDDEN = 'HIDDEN',
}

export type DatePickerType = 'date' | 'dateTime' | 'time';

export * from './tab';
export * from './menu';
export * from './api';
export * from './css';
export * from './notification';
export * from './common';

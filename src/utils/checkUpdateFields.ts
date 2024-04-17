import { isEqual } from 'lodash';

export function checkUpdateField<T>(
  fields: (keyof T)[],
  oldData: Partial<T>,
  newData: Partial<T>,
): {
  canUpdate: boolean;
  updateData: Partial<T>;
} {
  let canUpdate = false;
  const updateData: Partial<T> = {};

  for (const field of fields) {
    if (Array.isArray(oldData[field]) && Array.isArray(newData[field])) {
      const oldArray = oldData[field] as unknown[];
      const newArray = newData[field] as unknown[];
      // sort Array so that equal comparison is stable
      oldData[field] = oldArray.slice().sort() as T[keyof T];
      newData[field] = newArray.slice().sort() as T[keyof T];
    }
    if (!isEqual(oldData[field], newData[field])) {
      canUpdate = true;
      updateData[field] = newData[field];
    }
  }
  return {
    canUpdate,
    updateData,
  };
}

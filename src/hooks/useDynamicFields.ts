import { useCallback, useMemo, useState } from 'react';
import { FieldPath, FieldValues } from 'react-hook-form';

import { IDynamicSelectFieldProps } from '@/components';

type IUseDynamicFields<T extends FieldValues> = {
  fieldNames: FieldPath<T>[];
  numFilters: number;
  defaultFieldNames?: FieldPath<T>[];
};

/**
 * Choose initial current field names start from the first field
 */
function getInitialCurrentFieldNames(fieldNames: string[], numFields: number) {
  const result: Record<number, string> = {};
  for (let i = 0; i < numFields; ++i) {
    result[i] = fieldNames[i];
  }
  return result;
}

type IOnFieldChange = (fieldId: number) => (value: string) => void;

/**
 * Hook used to control the names of the dynamic fields
 */
export const useDynamicFields = <T extends FieldValues>(props: IUseDynamicFields<T>) => {
  const { fieldNames, numFilters, defaultFieldNames } = props;

  /**
   * New Set array default field name with fieldName when default field name is exist
   */
  const filteredNames = useMemo(() => {
    return defaultFieldNames
      ? [...new Set([...defaultFieldNames, ...fieldNames])]
      : fieldNames;
  }, [defaultFieldNames, fieldNames]);

  const [currentFieldNames, setCurrentFieldNames] = useState<Record<string, string>>(
    getInitialCurrentFieldNames(filteredNames, numFilters),
  );

  /**
   * Set current field names before change field
   */
  const onFieldChange = useCallback<IOnFieldChange>(
    (fieldId: number) => (value) => {
      setCurrentFieldNames((current) => ({ ...current, [fieldId]: value }));
    },
    [],
  );

  /**
   * Function useMemo use to filter excluded names in current field names
   * and return array dynamic select field props
   */
  const dynamicFieldsProps: Partial<IDynamicSelectFieldProps<T>>[] = useMemo(() => {
    let arrProps: Partial<IDynamicSelectFieldProps<T>>[] = [];
    if (fieldNames.length === 0) return [];
    for (let i = 0; i < numFilters; ++i) {
      const excludedNames = Object.entries(currentFieldNames).filter(
        ([key]) => parseInt(key) !== i,
      );
      const mapExcludedNames = excludedNames.map((item) => item[1]);
      const finalNames = filteredNames.filter(
        (name) => !mapExcludedNames?.includes(name),
      );

      if (finalNames.length === 0) return [];

      arrProps = [
        ...arrProps,
        {
          // Dynamic select field props
          menuItems: finalNames.map((value) => ({ value })),
          defaultName: filteredNames[i],
          onChange: onFieldChange(i),
        },
      ];
    }
    return arrProps;
  }, [currentFieldNames, fieldNames, filteredNames, numFilters, onFieldChange]);

  return dynamicFieldsProps;
};

export default useDynamicFields;

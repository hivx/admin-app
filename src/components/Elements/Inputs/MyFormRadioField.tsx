import { useRef } from 'react';
import { Control, Controller, FieldPath, FieldValues } from 'react-hook-form';

import { IMyRadioGroupProps, MyRadioGroup } from './MyRadioGroup';

export type MyFormRadioFieldProps<T extends FieldValues> = {
  name: FieldPath<T>;
  control?: Control<T>;
  MyRadioGroupProps?: IMyRadioGroupProps;
};

// This component
export function MyFormRadioField<T extends FieldValues>(props: MyFormRadioFieldProps<T>) {
  const { control, name } = props;
  const textFieldRef = useRef<HTMLInputElement>(null); // for tooltip to get anchor position
  return (
    <Controller
      name={name}
      control={control}
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      render={({ field: { ref, ...fieldWithoutRef } }) => (
        <MyRadioGroup
          {...fieldWithoutRef}
          ref={textFieldRef}
          {...props.MyRadioGroupProps}
        />
      )}
    />
  );
}

import { useRef } from 'react';
import { Control, Controller, FieldPath, FieldValues } from 'react-hook-form';

import { uuidv4 } from '@/utils/uuidv4';

import { ErrorTooltip } from '../Tooltip/ErrorTooltip';

import { MyTextField, MyTextFieldProps } from './MyTextField';

export type MyFormTextFieldProps<T extends FieldValues> = {
  name: FieldPath<T>;
  control?: Control<T>;
  MyTextFieldProps?: MyTextFieldProps;
};

// This component
export function MyFormTextField<T extends FieldValues>(props: MyFormTextFieldProps<T>) {
  const { control, name } = props;
  const fieldState = control?.getFieldState(name);
  const errorMessage = fieldState?.error?.message;
  const hasError = !!fieldState?.error;
  const textFieldRef = useRef<HTMLDivElement>(null); // for tooltip to get anchor position
  return (
    <Controller
      name={props.name}
      control={props.control}
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      render={({ field: { ref, ...fieldWithoutRef } }) => (
        <>
          <ErrorTooltip
            errorMessage={errorMessage}
            fieldRef={textFieldRef}
            key={uuidv4()} // create a new component when re-render
          />
          <MyTextField
            {...fieldWithoutRef}
            ref={textFieldRef}
            error={hasError}
            size="small"
            {...props.MyTextFieldProps}
          />
        </>
      )}
    />
  );
}

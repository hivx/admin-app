import {
  Control,
  Controller,
  FieldPath,
  FieldValues,
  ControllerRenderProps,
  Path,
} from 'react-hook-form';

import { IMyCheckboxProps, MyCheckbox } from './MyCheckbox';

export type MyFormCheckboxFieldProps<T extends FieldValues> = {
  name: FieldPath<T>;
  control: Control<T>;
  render?: (field: ControllerRenderProps<T, Path<T>>) => React.ReactElement;
  MyCheckboxProps?: IMyCheckboxProps;
};

// This component
export function MyFormCheckboxField<T extends FieldValues>(
  props: MyFormCheckboxFieldProps<T>,
) {
  return (
    <Controller
      name={props.name}
      control={props.control}
      render={
        props?.render
          ? ({ field }) => (props.render ? props.render(field) : <></>)
          : ({ field: { value, onChange } }) => (
              <MyCheckbox
                checked={!!value}
                onChange={onChange}
                {...props.MyCheckboxProps}
              />
            )
      }
    />
  );
}

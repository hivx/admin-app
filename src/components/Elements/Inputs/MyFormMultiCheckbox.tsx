import React from 'react';
import {
  Control,
  Controller,
  Path,
  FieldValues,
  ControllerRenderProps,
} from 'react-hook-form';

type RenderCheckboxType<T extends FieldValues> = (
  field: ControllerRenderProps<T, Path<T>>,
) => React.ReactElement;

export type MyFormMultiCheckboxProps<T extends FieldValues> = {
  name: Path<T>;
  control?: Control<T>;
  renderInput?: RenderCheckboxType<T>;
};
export const MyFormMultiCheckbox = <T extends FieldValues>(
  props: MyFormMultiCheckboxProps<T>,
) => {
  const { name, control, renderInput } = props;

  return (
    <>
      <Controller
        name={name}
        control={control}
        render={(renderProps) => {
          return <>{renderInput ? renderInput(renderProps.field) : <></>}</>;
        }}
      />
    </>
  );
};

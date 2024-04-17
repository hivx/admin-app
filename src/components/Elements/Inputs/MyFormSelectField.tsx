import { css, FormControl, InputLabel, InputLabelProps, styled } from '@mui/material';
// eslint-disable-next-line no-restricted-imports
import { SelectChangeEvent } from '@mui/material/Select/SelectInput';
import { ComponentProps, ReactNode, useRef } from 'react';
import { Control, Controller, FieldPath, FieldValues } from 'react-hook-form';

import { filterTransientProps } from '@/utils/filterTransientProps';
import { uuidv4 } from '@/utils/uuidv4';

import { ErrorTooltip } from '../Tooltip/ErrorTooltip';

import { IMySelectProps, MySelect } from './MySelect';

export type MyFormSelectFieldProps<T extends FieldValues> = {
  name: FieldPath<T>;
  control: Control<T>;
  MySelectProps?: IMySelectProps<T>;
  children?: ReactNode;
  required?: boolean;
  // callbackFunction?: (e: SelectChangeEvent<T>) => void;
};

// This component
export function MyFormSelectField<T extends FieldValues>(
  props: MyFormSelectFieldProps<T>,
) {
  const fieldState = props.control?.getFieldState(props.name);
  const errorMessage = fieldState?.error?.message;
  const hasError = !!fieldState?.error;
  const selectFieldRef = useRef<HTMLElement>(null); // for tooltip to get anchor position

  const size = props.MySelectProps?.size || 'small';
  const inputLabelSize: InputLabelProps['size'] = mapSelectSizeToInputSize(size);
  return (
    <Controller
      name={props.name}
      control={props.control}
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      render={({ field: { ref, ...fieldWithoutRef } }) => (
        <FormControl fullWidth required={props?.required}>
          <ErrorTooltip
            errorMessage={errorMessage}
            fieldRef={selectFieldRef}
            key={uuidv4()} // create a new component when re-render
          />
          <StyledInputLabel
            error={hasError}
            id={`label-${props.name}`}
            size={inputLabelSize}
            $sizeInput={size}
          >
            {props.MySelectProps?.label}
          </StyledInputLabel>
          <MySelect
            ref={selectFieldRef}
            labelId={`label-${props.name}`}
            size={size}
            fullWidth
            {...fieldWithoutRef}
            value={fieldWithoutRef.value || ''}
            error={hasError}
            onChange={(e: SelectChangeEvent<T>) => {
              return fieldWithoutRef.onChange(e.target.value);
            }}
            {...props.MySelectProps}
          >
            {props.children}
          </MySelect>
        </FormControl>
      )}
    />
  );
}

const mapSelectSizeToInputSize = <T,>(
  size?: IMySelectProps<T>['size'],
): InputLabelProps['size'] => {
  switch (size) {
    case 'medium':
      return 'normal';
    case 'extrasmall':
      return 'small';
    default:
      return size;
  }
};

const StyledInputLabel = styled(InputLabel, filterTransientProps)<{
  $sizeInput: ComponentProps<typeof MySelect>['size'];
}>`
  ${(props) => {
    switch (props.$sizeInput) {
      case 'extrasmall':
        return css`
          font-size: 12px;
        `;
    }
  }}
`;

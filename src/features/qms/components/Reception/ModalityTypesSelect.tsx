import { FormControl, ToggleButtonGroup } from '@mui/material';
// eslint-disable-next-line no-restricted-imports
import { SelectChangeEvent } from '@mui/material/Select/SelectInput';
import { Stack } from '@mui/system';
import { ReactNode } from 'react';
import { Control, Controller, FieldPath, FieldValues } from 'react-hook-form';

import { IMySelectProps, MySelect } from '@/components';

type ModalityTypesSelectProps<T extends FieldValues> = {
  name: FieldPath<T>;
  control: Control<T>;
  MySelectProps?: IMySelectProps<T>;
  ModalityButtons?: ReactNode[];
  renderSelectFields?: ReactNode[];
};

// This component
export function ModalityTypesSelect<T extends FieldValues>(
  props: ModalityTypesSelectProps<T>,
) {
  return (
    <Controller
      name={props.name}
      control={props.control}
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      render={({ field: { ref, ...fieldWithoutRef } }) => (
        <FormControl fullWidth>
          <Stack direction="row">
            {props.ModalityButtons && (
              <ToggleButtonGroup
                fullWidth
                {...fieldWithoutRef}
                value={fieldWithoutRef.value || ''}
                onChange={(event) => {
                  return fieldWithoutRef.onChange([
                    (event.target as HTMLInputElement).value,
                  ]);
                }}
              >
                {props.ModalityButtons}
              </ToggleButtonGroup>
            )}
            {props.renderSelectFields && (
              <MySelect
                style={{ borderRadius: '0px' }}
                labelId={`label-${props.name}`}
                fullWidth
                {...fieldWithoutRef}
                value={fieldWithoutRef.value || ''}
                onChange={(e: SelectChangeEvent<T>) => {
                  return fieldWithoutRef.onChange([e.target.value]);
                }}
                {...props.MySelectProps}
              >
                {props.renderSelectFields}
              </MySelect>
            )}
          </Stack>
        </FormControl>
      )}
    />
  );
}

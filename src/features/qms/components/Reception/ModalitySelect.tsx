import { FormControl, styled } from '@mui/material';
// eslint-disable-next-line no-restricted-imports
import { ReactNode } from 'react';
import { Control, Controller, FieldPath, FieldValues } from 'react-hook-form';

type ModalitySelectProps<T extends FieldValues> = {
  name: FieldPath<T>;
  control: Control<T>;
  ModalityButtons?: ReactNode[];
};

// This component
export function ModalitySelect<T extends FieldValues>(props: ModalitySelectProps<T>) {
  return (
    <Controller
      name={props.name}
      control={props.control}
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      render={({ field: { ref, ...fieldWithoutRef } }) => (
        <FormControl fullWidth>
          {props.ModalityButtons && (
            <StyledButtonGroup>{props.ModalityButtons}</StyledButtonGroup>
          )}
        </FormControl>
      )}
    />
  );
}

const StyledButtonGroup = styled('div')`
  display: grid;
  grid-template-columns: repeat(
    auto-fit,
    ${(props) => props.theme.qms?.layout.qmsModalityItem.width}
  );
  gap: ${(props) => props.theme.spacing(2)};
`;

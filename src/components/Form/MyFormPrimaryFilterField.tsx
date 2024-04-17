import CloseIcon from '@mui/icons-material/Close';
import SearchIcon from '@mui/icons-material/Search';
import { InputAdornment } from '@mui/material';
import { useRef } from 'react';
import { Control, Controller, FieldPath, FieldValues } from 'react-hook-form';

import { useTranslate, useAnchorElement } from '@/hooks';

import { MyTextField, MyTextFieldProps } from '../Elements';
import { StyledIconButtonWithToolTip } from '../Layout/NavBar/NavBar';

import { StyledPrimaryFieldInsideTableHeader } from './StyledPrimaryFieldInsideTableHeader';

export type MyFormPrimaryFilterFieldProps<T extends FieldValues> = {
  name: FieldPath<T>;
  control?: Control<T>;
  /**
   * If form values are not equal to default values (form has been touched by the user)
   * @default false
   */
  isFormDirty?: boolean;
  isExpanded: boolean;
  /**
   * If true, we will only show reset button when form is dirty
   * If false, the reset button will show at all times
   * @default true
   */
  resetFormOnDirty?: boolean;
  handleSubmit: () => void;
  handleExpand: ReturnType<typeof useAnchorElement>['open'];
  /**
   * Reset form values
   */
  handleReset: () => void;
  MyTextFieldProps?: MyTextFieldProps;
};

/**
 * This component is used as the primary filter field with start and end icons
 * for submit and form expansions
 */
export function MyFormPrimaryFilterField<T extends FieldValues>(
  props: MyFormPrimaryFilterFieldProps<T>,
) {
  const textFieldRef = useRef<HTMLDivElement>(null); // for the expanded area to bind into and copy its width
  const {
    handleExpand,
    isFormDirty = false,
    resetFormOnDirty = true,
    control,
    name,
    handleReset,
  } = props;
  const translate = useTranslate();
  const fieldState = control?.getFieldState(name);
  const errorMessage = fieldState?.error?.message;
  const hasError = !!fieldState?.error;

  const ResetButton = (
    <StyledIconButtonWithToolTip
      title={translate.buttons.reset()}
      onClick={handleReset}
      size="small"
    >
      <CloseIcon color="inherit" />
    </StyledIconButtonWithToolTip>
  );
  return (
    <>
      <Controller
        name={props.name}
        control={props.control}
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        render={({ field: { ref, ...fieldWithoutRef } }) => (
          <StyledPrimaryFieldInsideTableHeader>
            <MyTextField
              ref={textFieldRef}
              {...fieldWithoutRef}
              helperText={errorMessage}
              error={hasError}
              size="small"
              onFocus={(e) => handleExpand(e, textFieldRef.current)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    {resetFormOnDirty ? isFormDirty && ResetButton : ResetButton}
                  </InputAdornment>
                ),
              }}
              {...props.MyTextFieldProps}
            />
          </StyledPrimaryFieldInsideTableHeader>
        )}
      />
    </>
  );
}

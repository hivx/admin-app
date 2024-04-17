import { FormControl, Grid, MenuItem, SelectChangeEvent } from '@mui/material';
import { useEffect, useState } from 'react';
import {
  Control,
  Controller,
  FieldError,
  FieldErrorsImpl,
  FieldPath,
  FieldValues,
  Path,
  PathValue,
  UseFormGetValues,
  UseFormResetField,
  UseFormSetValue,
} from 'react-hook-form';

import { StyledSelectField, StyledTextField } from './DynamicSelectField.styles';

export type IDynamicSelectFieldProps<T extends FieldValues> = {
  /**
   * 	Control object is from invoking useForm
   */
  control?: Control<T>;
  /**
   *  Generic default name
   */
  defaultName?: FieldPath<T>;
  /**
   * Display text array. Should have length be equal to fieldNames's length
   */
  menuItems?: { value: FieldPath<T>; text?: string }[];
  getValues: UseFormGetValues<T>;
  setValue: UseFormSetValue<T>;
  /**
   * Disabled when loading data
   */
  disabled?: boolean;
  /**
   *  Reset an individual field state from useForm
   */
  resetField: UseFormResetField<T>;
  /**
   * This object contains information about the entire
   * form state
   */
  errors?: FieldErrorsImpl<T>;
  /**
   * Get value selected before change dynamic Select
   */
  onChange?: (value: string) => void;
};

export function DynamicSelectField<T extends FieldValues>(
  props: IDynamicSelectFieldProps<T>,
) {
  const {
    control,
    menuItems,
    defaultName,
    getValues,
    setValue,
    disabled,
    errors,
    resetField,
    onChange,
  } = props;

  const valueEmpty = '' as PathValue<T, Path<T>>;
  const [name, setName] = useState<FieldPath<T> | undefined>(defaultName);

  // Tat ca cac field name options neu khong co gia tri
  // Se duoc gan value la undefined
  // Sau do kiem tra defaultName co gia tri hay chua
  // Neu gia tri la undefined: se gan gia tri empty cho field de thuc hien validate
  useEffect(() => {
    if (name && !getValues(name)) setValue(name, valueEmpty);
  }, [getValues, name, setValue]);

  const handleChange = (value: FieldPath<T>) => {
    /**
     * Reset field name value is undefined
     */
    name && resetField(name, { defaultValue: undefined });
    /**
     * Set name and set value cho name la empty
     * Thuc hien validate value cho field
     */
    setName(value);
    setValue(value, valueEmpty);
    onChange && onChange(value);
  };

  const errorMessage = errors && (errors[name] as FieldError);

  return (
    <Grid container>
      <Grid item xs={12}>
        <FormControl size="small" fullWidth>
          <StyledSelectField
            disabled={disabled}
            value={name}
            onChange={(event: SelectChangeEvent<FieldPath<T> | unknown>) =>
              handleChange(event.target.value as FieldPath<T>)
            }
          >
            {menuItems &&
              menuItems.map((item, index) => {
                return (
                  <MenuItem key={index} value={item.value}>
                    {item.text}
                  </MenuItem>
                );
              })}
          </StyledSelectField>
        </FormControl>
      </Grid>

      <Grid item xs={12}>
        {name && (
          <Controller
            name={name}
            control={control}
            render={({ field: { onChange, value } }) => (
              <StyledTextField
                disabled={disabled}
                fullWidth
                helperText={errorMessage?.message}
                error={errors && !!errors[name]}
                value={value}
                onChange={onChange}
              />
            )}
          />
        )}
      </Grid>
    </Grid>
  );
}

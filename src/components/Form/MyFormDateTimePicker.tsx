import { Box, TextFieldProps } from '@mui/material';
import { Dayjs } from 'dayjs';
import { useCallback, useRef } from 'react';
import {
  Control,
  Controller,
  ControllerRenderProps,
  FieldValues,
  Path,
  UseFormWatch,
} from 'react-hook-form';
import { LocalizedString } from 'typesafe-i18n';

import { DatePickerType } from '@/types';
import { CustomSizeField } from '@/types/CustomSizeFieldMui';
import {
  formatDate,
  formatDateTime,
  itechDateTimeToDayjs,
  itechDateToDayjs,
} from '@/utils/dateUtils';
import { uuidv4 } from '@/utils/uuidv4';

import { StyledDateTimePickerWithPopup } from '../Elements/DatePicker/DateTimePickerWithPopup.styles';
import MyStaticDatePickerWithPopup from '../Elements/DatePicker/MyStaticDatePickerWithPopup';
import MyStaticDateTimePickerWithPopup from '../Elements/DatePicker/MyStaticDateTimePickerWithPopup';
import MyStaticTimePickerWithPopup from '../Elements/DatePicker/MyStaticTimePickerWithPopup';
import { ErrorTooltip } from '../Elements/Tooltip/ErrorTooltip';

type MyFormDateTimePickerProps<T extends FieldValues> = {
  /**
   * Name of form field
   */
  name: Path<T>;
  label?: string | LocalizedString;
  disabled?: boolean;
  watch: UseFormWatch<T>;
  type: DatePickerType;
  TextFieldProps?: TextFieldProps;
  control: Control<T>;
  customSize?: CustomSizeField;
};

type FieldDateTimePickerProps<T extends FieldValues> = {
  onDateTimeChange: (date: Dayjs | null) => void;
  value: Dayjs | null;
  inputRef?: React.Ref<HTMLInputElement>;
} & Pick<
  MyFormDateTimePickerProps<T>,
  'label' | 'disabled' | 'TextFieldProps' | 'type' | 'customSize'
>;

/**
 * From type 'date' 'time' 'dateTime' and value -> convert to string.
 * Type 'time' or 'dateTime' need convert to DateTime string,
 * for MyFormDateTimePicker not working wrong
 */
const convertDateTimeByType = (type: DatePickerType, value: Dayjs | null) => {
  switch (type) {
    case 'time':
      return formatDateTime(value);
    case 'dateTime':
      return formatDateTime(value);
    case 'date':
      return formatDate(value);
  }
};

export const MyFormDateTimePicker = <T extends FieldValues>(
  props: MyFormDateTimePickerProps<T>,
) => {
  const { name, watch, type, control, TextFieldProps, ...dateTimeProps } = props;
  const inputFieldRef = useRef<HTMLInputElement>(null); // for date time picker to get anchor position
  const dateTimeFieldValue = watch(name);
  const dateTimejs =
    type === 'dateTime' || type === 'time'
      ? itechDateTimeToDayjs(dateTimeFieldValue)
      : itechDateToDayjs(dateTimeFieldValue);

  const fieldState = control?.getFieldState(name);
  const errorMessage = fieldState?.error?.message;
  const hasError = !!fieldState?.error;
  const handleDateTimeChange = useCallback(
    (
      newValue: Dayjs | null,
      onFieldChange: ControllerRenderProps<T, Path<T>>['onChange'],
    ) => {
      const formattedDateTime = convertDateTimeByType(type, newValue);
      onFieldChange(formattedDateTime); // set new form value
      return;
    },
    [type],
  );

  return (
    <Box width="100%">
      <Controller
        name={name}
        control={control}
        render={({ field: { ref, ...fieldWithoutRef } }) => (
          <>
            <ErrorTooltip
              errorMessage={errorMessage}
              fieldRef={inputFieldRef}
              key={uuidv4()} // create a new component when re-render
            />
            <FieldDateTimePicker
              onDateTimeChange={(newDate) =>
                handleDateTimeChange(newDate, fieldWithoutRef.onChange)
              }
              type={type}
              value={dateTimejs}
              inputRef={inputFieldRef}
              TextFieldProps={{
                size: TextFieldProps?.size ?? 'small',
                error: hasError,
                ...TextFieldProps,
              }}
              {...dateTimeProps}
            />
          </>
        )}
      />
    </Box>
  );
};
/**
 * Switch date time field render by type
 */
const FieldDateTimePicker = <T extends FieldValues>(
  props: FieldDateTimePickerProps<T>,
) => {
  const { onDateTimeChange, type, TextFieldProps, ...rest } = props;

  const renderPicker = () => {
    switch (type) {
      case 'dateTime': {
        return (
          <MyStaticDateTimePickerWithPopup
            onChange={onDateTimeChange}
            slotProps={{
              textField: {
                ...TextFieldProps,
              },
              actionBar: { actions: ['today', 'accept'] },
              layout: {
                sx(theme) {
                  return {
                    background: theme.palette.background.default,
                  };
                },
              },
            }}
            {...rest}
          />
        );
      }
      case 'time': {
        return (
          <MyStaticTimePickerWithPopup
            onChange={onDateTimeChange}
            slotProps={{
              textField: {
                ...TextFieldProps,
              },
              actionBar: { actions: ['today', 'accept'] },
              layout: {
                sx(theme) {
                  return {
                    background: theme.palette.background.default,
                  };
                },
              },
            }}
            {...rest}
          />
        );
      }
      case 'date': {
        return (
          <MyStaticDatePickerWithPopup
            onChange={onDateTimeChange}
            slotProps={{
              textField: {
                ...TextFieldProps,
              },
              layout: {
                sx(theme) {
                  return {
                    background: theme.palette.background.default,
                  };
                },
              },
            }}
            {...rest}
          />
        );
      }
    }
  };

  return <StyledDateTimePickerWithPopup>{renderPicker()}</StyledDateTimePickerWithPopup>;
};

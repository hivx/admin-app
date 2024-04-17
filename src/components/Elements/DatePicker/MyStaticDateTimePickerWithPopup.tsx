import styled from '@emotion/styled';
import {
  DateTimePicker,
  DateTimePickerSlotsComponentsProps,
  DateTimePickerProps,
} from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Dayjs } from 'dayjs';
import { FC, useCallback } from 'react';

import { globalStyles } from '@/providers/ThemeProvider';
import { CustomSizeField } from '@/types/CustomSizeFieldMui';
import { DISPLAY_FORMAT } from '@/utils/dateUtils';
import { filterTransientProps } from '@/utils/filterTransientProps';

import { MyTextField } from '../Inputs';

import { DateTimePickerCommonProps } from './MyStaticDatePickerWithPopup';

type MyDateTimePickerProps = {
  slotProps?: DateTimePickerSlotsComponentsProps<Dayjs> | undefined;
} & Omit<DateTimePickerProps<Dayjs>, 'onChange' | 'value'> &
  DateTimePickerCommonProps;

/**
 * New date time field picker with popup (from x-date-pickers v0.6.5 )
 */
const MyStaticDateTimePickerWithPopup: FC<MyDateTimePickerProps> = (props) => {
  const { onChange, value, disabled = false, customSize, ...rest } = props;
  const disabledValue = value?.format(DISPLAY_FORMAT.dateTimeNoSecond);

  const handleChange = useCallback<(newValue: typeof value) => void>(
    (newValue) => {
      onChange && onChange(newValue, value);
    },
    [onChange, value],
  );
  return disabled ? (
    <MyTextField
      disabled
      value={disabledValue}
      label={rest.label}
      {...rest.slotProps?.textField}
      size={customSize ?? 'small'}
    />
  ) : (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en">
      <StyledDateTimeCommonWrapper $customSize={customSize}>
        <DateTimePicker
          value={value}
          onChange={handleChange}
          ampm={false}
          format={DISPLAY_FORMAT.dateTimeNoSecond}
          {...rest}
        />
      </StyledDateTimeCommonWrapper>
    </LocalizationProvider>
  );
};

export default MyStaticDateTimePickerWithPopup;

/**
 * Gói component chọn ngày, giờ để styles theo custom size
 */
export const StyledDateTimeCommonWrapper = styled('div', filterTransientProps)<{
  $customSize: CustomSizeField;
}>`
  width: 100%;
  ${(props) => {
    switch (props.$customSize) {
      case 'extrasmall':
        return globalStyles.extraSmallDateTimeField;
    }
  }}
`;

import { TimePickerProps } from '@mui/lab';
import { TimePickerSlotsComponentsProps, TimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Dayjs } from 'dayjs';
import { FC, useCallback } from 'react';

import { PRINT_FORMAT } from '@/utils/dateUtils';

import { MyTextField } from '../Inputs';

import { DateTimePickerCommonProps } from './MyStaticDatePickerWithPopup';
import { StyledDateTimeCommonWrapper } from './MyStaticDateTimePickerWithPopup';

type MyTimePickerProps = {
  slotProps?: TimePickerSlotsComponentsProps<Dayjs> | undefined;
} & Omit<TimePickerProps<Dayjs>, 'onChange' | 'value'> &
  DateTimePickerCommonProps;

/**
 * New field time picker with popup (from x-date-pickers v0.6.5 )
 */
const MyStaticTimePickerWithPopup: FC<MyTimePickerProps> = (props) => {
  const { onChange, value, disabled = false, customSize, ...rest } = props;
  const disabledValue = value?.format(PRINT_FORMAT.time);
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
        <TimePicker value={value} onChange={handleChange} ampm={false} {...rest} />
      </StyledDateTimeCommonWrapper>
    </LocalizationProvider>
  );
};

export default MyStaticTimePickerWithPopup;

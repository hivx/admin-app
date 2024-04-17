import { StaticDatePickerProps } from '@mui/lab';
import { DateCalendar } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Dayjs } from 'dayjs';
import { FC, useCallback } from 'react';

type MyStaticDatePickerProps = {
  onChange: (newValue: Dayjs | null, currentValue: Dayjs | null) => void;
  value: Dayjs | null;
} & Omit<StaticDatePickerProps<Dayjs>, 'onChange' | 'value'>;

/**
 * Display list date to pick
 */
const MyDateCalendar: FC<MyStaticDatePickerProps> = (props) => {
  const { onChange, value, ...rest } = props;
  const handleChange = useCallback<(newValue: typeof value) => void>(
    (newValue) => {
      onChange && onChange(newValue, value);
    },
    [onChange, value],
  );
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en">
      <DateCalendar openTo="day" value={value} onChange={handleChange} {...rest} />
    </LocalizationProvider>
  );
};

export default MyDateCalendar;

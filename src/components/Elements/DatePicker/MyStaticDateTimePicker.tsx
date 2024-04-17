import { StaticDatePickerProps } from '@mui/lab';
import { StaticDateTimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Dayjs } from 'dayjs';
import { FC, useCallback } from 'react';

type MyStaticDateTimePickerProps = {
  onChange: (newValue: Dayjs | null, currentValue: Dayjs | null) => void;
  value: Dayjs | null;
} & Omit<StaticDatePickerProps<Dayjs>, 'onChange' | 'value'>;

const MyStaticDateTimePicker: FC<MyStaticDateTimePickerProps> = (props) => {
  const { onChange, value, ...rest } = props;
  // const [value, setValue] = useState<Dayjs | null>(initialTime ?? getCurrentTime());

  const handleChange = useCallback<(newValue: typeof value) => void>(
    (newValue) => {
      onChange && onChange(newValue, value);
    },
    [onChange, value],
  );
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en">
      <StaticDateTimePicker
        displayStaticWrapperAs="desktop"
        openTo="day"
        value={value}
        onChange={handleChange}
        views={['year', 'day', 'hours', 'minutes', 'seconds']}
        {...rest}
      />
    </LocalizationProvider>
  );
};

export default MyStaticDateTimePicker;

import { StaticDatePickerProps } from '@mui/lab';
import { DatePicker, DesktopDatePickerSlotsComponentsProps } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { Dayjs } from 'dayjs';
import { FC, useCallback } from 'react';

import { CustomSizeField } from '@/types/CustomSizeFieldMui';
import { DISPLAY_FORMAT, PRINT_FORMAT } from '@/utils/dateUtils';

import { MyTextField } from '../Inputs';

import { StyledDateTimeCommonWrapper } from './MyStaticDateTimePickerWithPopup';

export type DateTimePickerCommonProps = {
  onChange: (newValue: Dayjs | null, currentValue: Dayjs | null) => void;
  value: Dayjs | null;
  label?: string;
  inputRef?: React.Ref<HTMLInputElement>;
  disabled?: boolean;
  customSize?: CustomSizeField;
};
type MyDatePickerWithPopupProps = {
  slotProps?: DesktopDatePickerSlotsComponentsProps<Dayjs> | undefined;
} & Omit<StaticDatePickerProps<Dayjs>, 'onChange' | 'value'> &
  DateTimePickerCommonProps;

/**
 * New field date picker with popup (from x-date-pickers v0.6.5 )
 */
const MyStaticDatePickerWithPopup: FC<MyDatePickerWithPopupProps> = (props) => {
  const { onChange, value, inputRef, disabled = false, customSize, ...rest } = props;
  const disabledValue = value?.format(PRINT_FORMAT.date);
  // const [value, setValue] = useState<Dayjs | null>(initialTime ?? getCurrentTime());
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
        <DatePicker
          inputRef={inputRef}
          openTo="day"
          value={value}
          onChange={handleChange}
          format={DISPLAY_FORMAT.date}
          {...rest}
        />
      </StyledDateTimeCommonWrapper>
    </LocalizationProvider>
  );
};

export default MyStaticDatePickerWithPopup;

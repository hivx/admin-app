import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import { Box, ClickAwayListener, InputAdornment, styled } from '@mui/material';
import { Dayjs } from 'dayjs';
import { useCallback, useEffect, useRef, useState } from 'react';
import {
  FieldValues,
  Path,
  PathValue,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form';
import { LocalizedString } from 'typesafe-i18n';

import { useAnchorElement, useTranslate } from '@/hooks';
import { globalStyles } from '@/providers/ThemeProvider';
import {
  DISPLAY_FORMAT,
  formatDate,
  getCurrentDate,
  itechDateToDayjs,
} from '@/utils/dateUtils';

import {
  IMyDateRangePickerPopupProps,
  MyDateRangePickerPopup,
  MyTextField,
  MyTextFieldProps,
} from '../Elements';

type MyFormDateRangePickerProps<T extends FieldValues> = {
  nameStart: Path<T>;
  nameEnd: Path<T>;
  label?: string | LocalizedString;
  formSetValue: UseFormSetValue<T>;
  watch: UseFormWatch<T>;
  // size?: TextFieldProps['size'];
  MyTextFieldProps?: MyTextFieldProps;
  /**
   * value for default date state
   * if value,default date state does not depend on form value
   */
  value?: DateState;
};

type DateState = {
  startDate: string | null;
  endDate: string | null;
};

export const MyFormDateRangePicker = <T extends FieldValues>(
  props: MyFormDateRangePickerProps<T>,
) => {
  const { nameStart, nameEnd, label, formSetValue, watch, MyTextFieldProps, value } =
    props;

  const textFieldRef = useRef<HTMLDivElement>(null); // for date picker to get anchor position
  const { isOpen, open, close, anchorEl } = useAnchorElement();
  const translate = useTranslate();
  const [formStartDateValue, formEndDateValue] = watch([nameStart, nameEnd]);
  const [localDateState, setLocalDateState] = useState<DateState>({
    startDate: value ? value.startDate : formStartDateValue,
    endDate: value ? value.endDate : formEndDateValue,
  });

  const startDateDayjs = itechDateToDayjs(localDateState.startDate);
  const endDateDayjs = itechDateToDayjs(localDateState.endDate);

  /**
   * Handle form submission logic
   */
  const onDateChanged = useCallback(
    (newState: DateState) => {
      // only update form if both dates are present or
      // both dates are null (Select All Date)
      if (
        (newState.startDate && newState.endDate) ||
        (!newState.startDate && !newState.endDate)
      ) {
        /**
         * CONSTRAINTS: startDate and endDate in form must be of type string
         * Given this constraint, we can use "as" to cast type
         */
        formSetValue(nameStart, newState.startDate as PathValue<T, Path<T>>);
        formSetValue(nameEnd, newState.endDate as PathValue<T, Path<T>>);
      }
    },
    [formSetValue, nameEnd, nameStart],
  );

  /**
   * Set value vào form,
   * Tránh trường hợp khi user không thao tác với date picker -> giá trị ngày submit sẽ bị sai
   */
  useEffect(() => {
    if (value) {
      onDateChanged(value);
    }
  }, []);

  /**
   * Handle closing popup logic
   * If one of 2 dates is not specified, defaults to today
   */
  const onClose = useCallback(() => {
    close();
    if (localDateState.startDate && !localDateState.endDate) {
      const today = formatDate(getCurrentDate());
      setLocalDateState((prevState) => {
        const newState = { ...prevState, endDate: today };
        onDateChanged(newState);
        return newState;
      });
    } else if (!localDateState.startDate && localDateState.endDate) {
      const today = formatDate(getCurrentDate());
      setLocalDateState((prevState) => {
        const newState = { ...prevState, startDate: today };
        onDateChanged(newState);
        return newState;
      });
    }
  }, [close, localDateState.endDate, localDateState.startDate, onDateChanged]);

  const handleStartDateChange = useCallback<
    IMyDateRangePickerPopupProps['onStartDateChange']
  >(
    (newValue) => {
      setLocalDateState((prevState) => {
        const newState = { ...prevState, startDate: formatDate(newValue) };
        onDateChanged(newState);
        return newState;
      });
      return;
    },
    [onDateChanged],
  );

  const handleEndDateChange = useCallback<
    IMyDateRangePickerPopupProps['onEndDateChange']
  >(
    (newValue) => {
      setLocalDateState((prevState) => {
        const newState = { ...prevState, endDate: formatDate(newValue) };
        onDateChanged(newState);
        return newState;
      });
      return;
    },
    [onDateChanged],
  );

  return (
    <ClickAwayListener onClickAway={onClose} mouseEvent="onMouseUp">
      <Box width="100%">
        <MyTextField
          ref={textFieldRef}
          value={formatTextDate(startDateDayjs, endDateDayjs)}
          label={label}
          placeholder={`${translate.date.startDate()} - ${translate.date.endDate()}`}
          onClick={(e) => !isOpen && open(e, textFieldRef.current)}
          fullWidth
          size="small"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <CalendarMonthIcon />
              </InputAdornment>
            ),
          }}
          {...MyTextFieldProps}
        />
        {isOpen && (
          <MyDateRangePickerPopup
            anchorEl={anchorEl}
            startDate={startDateDayjs}
            showSelectAll
            endDate={endDateDayjs}
            onStartDateChange={handleStartDateChange}
            onEndDateChange={handleEndDateChange}
            WrapperComponent={WrapperComponent}
          />
        )}
      </Box>
    </ClickAwayListener>
  );
};

const formatTextDate = (startDate: Dayjs | null, endDate: Dayjs | null): string => {
  if (startDate || endDate)
    return `${startDate ? startDate.format(DISPLAY_FORMAT.date) : ''} - ${
      endDate ? endDate.format(DISPLAY_FORMAT.date) : ''
    }`;
  return '';
};

const WrapperComponent = styled('div')`
  ${globalStyles.paperInputBackground}
  ${globalStyles.datePickerInputBackground}
`;

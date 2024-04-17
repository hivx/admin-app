import { FormControl, InputLabel, MenuItem, SelectChangeEvent } from '@mui/material';
import dayjs from 'dayjs';
import { FC } from 'react';
import { useWatch } from 'react-hook-form';

import { MySelect, MyTextField } from '@/components';
import { useTranslate } from '@/hooks';
import { DAY_OF_WEEK } from '@/types/dto/analytics';
import { DATE_FORMAT, itechDateToDayjs } from '@/utils/dateUtils';

import { useDateOfWeek } from '../../hook/useDateOfWeek';
import { PeriodDisplayType } from '../../hook/usePeriodDisplayData';
import { WeekdayType } from '../../hook/useScheduleTableData';

import { UpdateTimetableFormFieldsProps } from './UpdateTimetableFormFields';

/**
 * Trường chọn các thứ theo ca
 */
export const PeriodItem: FC<PeriodDisplayType & UpdateTimetableFormFieldsProps> = (
  props,
) => {
  return (
    <>
      <MyTextField
        key={props.id}
        disabled
        value={props.displayTime}
        label={props.periodName ?? ' '}
        size="small"
      />
      <DateSelectField {...props} />
    </>
  );
};

const DateSelectField: FC<PeriodDisplayType & UpdateTimetableFormFieldsProps> = (
  props,
) => {
  const translate = useTranslate();

  const { setValue, id: periodID } = props;
  const { period } = useWatch({
    control: props.control,
  });

  const periodDayData = period ? period[periodID] : [];
  const dayIndex = periodDayData
    ? periodDayData.map((item) => {
        const dayIndex = itechDateToDayjs(item)?.day() ?? 0;
        return dayIndex.toString();
      })
    : [];
  const { startOfWeek } = useDateOfWeek();

  /**
   * Update period form when select day of week
   */
  const onSelectDayOfWeek = (event: SelectChangeEvent<string[]>) => {
    const values = event.target.value;
    const dayOfWeeks: string[] = [];
    if (typeof values !== 'string') {
      values.map((item) => {
        if (item === '0') {
          dayOfWeeks.push(
            dayjs(startOfWeek).add(7, 'day').day(parseInt(item)).format(DATE_FORMAT),
          );
        } else {
          dayOfWeeks.push(dayjs(startOfWeek).day(parseInt(item)).format(DATE_FORMAT));
        }
      });
    }
    const newPeriod = period ?? {};
    newPeriod[periodID] = dayOfWeeks;
    setValue('period', newPeriod as { [x: string]: string[] });
  };

  return (
    <FormControl>
      <InputLabel size="small">Ngày</InputLabel>
      <MySelect
        fullWidth
        label="Ngày"
        size="small"
        aria-label="aa"
        value={dayIndex}
        multiple={true}
        onChange={onSelectDayOfWeek}
      >
        {Object.keys(DAY_OF_WEEK).map((value, index) => {
          return (
            <MenuItem key={index} value={index.toString()}>
              {translate.resources.timetable.weekday({
                weekday: index.toString() as WeekdayType,
              })}
            </MenuItem>
          );
        })}
      </MySelect>
    </FormControl>
  );
};

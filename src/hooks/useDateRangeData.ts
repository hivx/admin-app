import { Dayjs } from 'dayjs';
import { memoize } from 'lodash';

import { IDateRangeOption } from '@/components/Elements/DatePicker/DateRangeQuickButtonsBase';
import {
  DATE_FORMAT,
  getCurrentDate,
  isSameDay,
  itechDateToDayjs,
} from '@/utils/dateUtils';

import { useTranslate } from './useTranslate';

const getDateRangeOptions = memoize(
  (params) => {
    const { dateStr, dateFrom, dateTo, showSelectAll = false, translate } = params;
    const currentDateDayjs = itechDateToDayjs(dateStr) as Dayjs; // always return Dayjs since we provide it with correct format
    const dateFromDayjs = itechDateToDayjs(dateFrom ?? '');
    const dateToDayjs = itechDateToDayjs(dateTo ?? '');

    /**
     * initialize date range options
     */
    const dateRangeQuickOptions: IDateRangeOption[] = [
      {
        label: translate.date.today(),
        dateRange: {
          startDate: currentDateDayjs,
          endDate: currentDateDayjs,
        },
      },
      {
        label: translate.date.yesterday(),
        dateRange: {
          startDate: currentDateDayjs.subtract(1, 'day'),
          endDate: currentDateDayjs.subtract(1, 'day'),
        },
      },
      {
        label: translate.date.xDay({ date: 7 }),
        dateRange: {
          startDate: currentDateDayjs.subtract(7, 'day'),
          endDate: currentDateDayjs,
        },
      },
      {
        label: translate.date.xDay({ date: 30 }),
        dateRange: {
          startDate: currentDateDayjs.subtract(30, 'day'),
          endDate: currentDateDayjs,
        },
      },
    ];
    /**
     * add option 'Tất cả' to date range options
     */
    showSelectAll &&
      dateRangeQuickOptions.push({
        label: translate.date.allDate(),
        dateRange: {
          startDate: null,
          endDate: null,
        },
      });

    /**
     * add active state
     */
    const res = dateRangeQuickOptions.map((option) => ({
      ...option,
      isActive:
        isSameDay(dateFromDayjs, option.dateRange.startDate) &&
        isSameDay(dateToDayjs, option.dateRange.endDate),
    }));
    return res;
  },
  (args) => Object.values(args).join('_'),
);
/**
 * return date range data use to display button
 */
export const useDateRangeData = (props: {
  dateFrom: string | undefined;
  dateTo: string | undefined;
  showSelectAll?: boolean;
}) => {
  const translate = useTranslate();
  const currentDatetime = getCurrentDate();
  const dateStr = currentDatetime.format(DATE_FORMAT);

  const dateRangeQuickOptionsWithActiveState = getDateRangeOptions({
    ...props,
    translate,
    dateStr,
  });

  return dateRangeQuickOptionsWithActiveState;
};

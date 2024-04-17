import { FC, useCallback } from 'react';

import { useDateRangeData } from '@/hooks/useDateRangeData';
import { DATE_FORMAT } from '@/utils/dateUtils';

import {
  DateRangeQuickButtonsBase,
  IDateRangeQuickButtonsProps,
} from './DateRangeQuickButtonsBase';
import type { IDateRange, IMyDateRangePickerPopupProps } from './MyDateRangePickerPopup';

type DateRangeQuickButtonsProps = {
  currentState: IDateRange;
  showSelectAll?: boolean;
  onStartDateChange: IMyDateRangePickerPopupProps['onStartDateChange'];
  onEndDateChange: IMyDateRangePickerPopupProps['onEndDateChange'];
};

/**
 * Wrapper around DateRangeQuickButtonsBase to define common buttons
 * and active button logic
 */
export const DateRangeQuickButtons: FC<DateRangeQuickButtonsProps> = (props) => {
  const { currentState, showSelectAll, onStartDateChange, onEndDateChange } = props;

  const dateRangeQuickOptionsWithActiveState = useDateRangeData({
    dateFrom: currentState.startDate?.format(DATE_FORMAT),
    dateTo: currentState.endDate?.format(DATE_FORMAT),
    showSelectAll,
  });

  const handleButtonClick = useCallback<IDateRangeQuickButtonsProps['onButtonClick']>(
    (e, option) => {
      onStartDateChange(option.dateRange.startDate);
      onEndDateChange(option.dateRange.endDate);
    },
    [onEndDateChange, onStartDateChange],
  );

  return (
    <DateRangeQuickButtonsBase
      options={dateRangeQuickOptionsWithActiveState}
      onButtonClick={handleButtonClick}
    />
  );
};

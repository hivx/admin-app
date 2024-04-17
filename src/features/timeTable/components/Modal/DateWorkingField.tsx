import React from 'react';

import { MyTextField } from '@/components';
import { useAppSelector } from '@/hooks';
import { TABLE_SCHEDULE } from '@/stores/table/tableInitialState';
import { getCurrentSelectedRow } from '@/stores/table/tableSelectors';
import { TimeTableDatagrid } from '@/types/dto/timeTable';
import { DISPLAY_FORMAT, itechDateToDayjs } from '@/utils/dateUtils';

export const DateWorkingField = () => {
  const selectedRow = useAppSelector(
    getCurrentSelectedRow<TimeTableDatagrid>(TABLE_SCHEDULE),
  );

  return (
    <MyTextField
      value={`${selectedRow?.dateOfWeek}, ${itechDateToDayjs(
        selectedRow?.id ?? '',
      )?.format(DISPLAY_FORMAT.date)}`}
      disabled
      size="small"
    />
  );
};

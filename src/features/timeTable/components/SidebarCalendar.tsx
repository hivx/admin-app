import { styled } from '@mui/material';
import { Dayjs } from 'dayjs';
import React from 'react';

import MyDateCalendar from '@/components/Elements/DatePicker/MyDateCalendar';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { TABLE_SCHEDULE } from '@/stores/table/tableInitialState';
import { getCurrentTableQuery } from '@/stores/table/tableSelectors';
import { setTableFilter } from '@/stores/table/tableSlice';
import { formatDateTime, getCurrentDate, itechDateTimeToDayjs } from '@/utils/dateUtils';

export type SideBarTimetableFilter = {
  sidebarSelectedDay: string;
  userIDs: number[];
};

export const SidebarCalendar = () => {
  const dispatch = useAppDispatch();
  const query = useAppSelector(
    getCurrentTableQuery<SideBarTimetableFilter>(TABLE_SCHEDULE),
  );

  const onChange = (newValue: Dayjs | null) => {
    dispatch(
      setTableFilter({
        tableId: TABLE_SCHEDULE,
        filter: { ...query?.filter, sidebarSelectedDay: formatDateTime(newValue) },
      }),
    );
  };

  return (
    <StyledSidebarCalendar>
      <MyDateCalendar
        onChange={onChange}
        value={
          query?.filter.sidebarSelectedDay
            ? itechDateTimeToDayjs(query?.filter.sidebarSelectedDay)
            : getCurrentDate()
        }
      />
    </StyledSidebarCalendar>
  );
};

const StyledSidebarCalendar = styled('div')`
  .MuiDateCalendar-root {
    width: auto;
    margin: 0;
  }
  .MuiDayCalendar-weekDayLabel {
    width: 32px;
  }
  .MuiPickersDay-root {
    width: 32px;
    height: 32px;
  }
`;

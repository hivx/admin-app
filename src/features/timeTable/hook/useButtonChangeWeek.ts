import { useAppDispatch, useAppSelector } from '@/hooks';
import { TABLE_SCHEDULE } from '@/stores/table/tableInitialState';
import { getCurrentTableQuery } from '@/stores/table/tableSelectors';
import { setTableFilter } from '@/stores/table/tableSlice';
import { formatDateTime, getCurrentDate, itechDateTimeToDayjs } from '@/utils/dateUtils';

import { SideBarTimetableFilter } from '../components/SidebarCalendar';

export const useButtonChangeWeek = () => {
  const query = useAppSelector(
    getCurrentTableQuery<SideBarTimetableFilter>(TABLE_SCHEDULE),
  );
  const dispatch = useAppDispatch();
  const sidebarSelectedDay = query?.filter.sidebarSelectedDay
    ? itechDateTimeToDayjs(query?.filter.sidebarSelectedDay)
    : getCurrentDate();

  const onFowardWeek = () => {
    const newDay = sidebarSelectedDay?.add(7, 'day');
    dispatch(
      setTableFilter({
        tableId: TABLE_SCHEDULE,
        filter: { ...query?.filter, sidebarSelectedDay: formatDateTime(newDay) },
      }),
    );
  };

  const onPreviousWeek = () => {
    const newDay = sidebarSelectedDay?.add(-7, 'day');
    dispatch(
      setTableFilter({
        tableId: TABLE_SCHEDULE,
        filter: { ...query?.filter, sidebarSelectedDay: formatDateTime(newDay) },
      }),
    );
  };
  return { onFowardWeek, onPreviousWeek };
};

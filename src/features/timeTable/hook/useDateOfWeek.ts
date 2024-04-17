import { useAppSelector } from '@/hooks';
import { TABLE_SCHEDULE } from '@/stores/table/tableInitialState';
import { getCurrentTableQuery } from '@/stores/table/tableSelectors';
import { getCurrentDate, itechDateTimeToDayjs } from '@/utils/dateUtils';

import { SideBarTimetableFilter } from '../components/SidebarCalendar';

/**
 * get startOfWeek,endOfWeek
 */
export const useDateOfWeek = () => {
  const query = useAppSelector(
    getCurrentTableQuery<SideBarTimetableFilter>(TABLE_SCHEDULE),
  );

  const sidebarSelectedDay = query?.filter.sidebarSelectedDay
    ? itechDateTimeToDayjs(query?.filter.sidebarSelectedDay)
    : getCurrentDate();
  const startOfWeek = sidebarSelectedDay
    ? sidebarSelectedDay.startOf('week').toDate()
    : null;
  const endOfWeek = sidebarSelectedDay ? sidebarSelectedDay.endOf('week').toDate() : null;

  return { startOfWeek, endOfWeek };
};

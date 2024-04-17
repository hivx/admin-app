import dayjs from 'dayjs';

import { useGetListTimetableQuery } from '@/api/timeTable';
import { useAppSelector, useTranslate } from '@/hooks';
import { TABLE_SCHEDULE } from '@/stores/table/tableInitialState';
import { getCurrentTableQuery } from '@/stores/table/tableSelectors';
import { TimeTableDatagrid } from '@/types/dto/timeTable';
import { getCurrentDate, itechDateTimeToDayjs } from '@/utils/dateUtils';

import { SideBarTimetableFilter } from '../components/SidebarCalendar';

export const TIMETABLE_FORMAT = 'YYYYMMDD';

export type WeekdayType = '1' | '2' | '3' | '4' | '5' | '6' | '0';

/**
 * Xử lý để trả ra data dùng cho bảng Lịch làm việc
 */
export const useScheduleTableData = () => {
  const query = useAppSelector(
    getCurrentTableQuery<SideBarTimetableFilter>(TABLE_SCHEDULE),
  );
  const translate = useTranslate();
  const sidebarSelectedDay = query?.filter.sidebarSelectedDay
    ? itechDateTimeToDayjs(query?.filter.sidebarSelectedDay)
    : getCurrentDate();

  const startOfWeek = sidebarSelectedDay
    ? sidebarSelectedDay.startOf('week').toDate()
    : null;
  const endOfWeek = sidebarSelectedDay ? sidebarSelectedDay.endOf('week').toDate() : null;

  const fromDate = dayjs(startOfWeek).format(TIMETABLE_FORMAT);
  const toDate = dayjs(endOfWeek).format(TIMETABLE_FORMAT);

  const { data } = useGetListTimetableQuery(
    {
      filter: { userIDs: query?.filter.userIDs, fromDate, toDate },
    },
    { skip: !sidebarSelectedDay },
  );

  const timetableListData: TimeTableDatagrid[] = [];

  for (let index = 0; index < 7; index++) {
    const date = sidebarSelectedDay
      ? sidebarSelectedDay.startOf('week').add(index, 'day').toDate()
      : null;
    const day = index === 6 ? 0 : index + 1;
    timetableListData.push({
      id: dayjs(date).format(TIMETABLE_FORMAT),
      timetable: data?.list.find(
        (item) => item.id === dayjs(date).format(TIMETABLE_FORMAT),
      )?.timetable,
      dateOfWeek: translate.resources.timetable.weekday({
        weekday: day.toString() as WeekdayType,
      }),
    });
  }

  return timetableListData;
};

import { useGetOneTimetableQuery } from '@/api/timeTable';
import { useAppSelector } from '@/hooks';
import { TABLE_SCHEDULE } from '@/stores/table/tableInitialState';
import { getCurrentSelectedRow } from '@/stores/table/tableSelectors';
import { TimeTableDatagrid } from '@/types/dto/timeTable';

/**
 * Trả ra dữ liệu lịch làm việc hiển thị trong form
 */
export const useUpdateTimeTableFormData = () => {
  const selectedRow = useAppSelector(
    getCurrentSelectedRow<TimeTableDatagrid>(TABLE_SCHEDULE),
  );

  const { data: timeTableData } = useGetOneTimetableQuery(
    { id: selectedRow?.id ?? '' },
    { skip: !selectedRow?.id },
  );

  const selectedRowData: TimeTableDatagrid = {
    id: selectedRow?.id ?? '',
    dateOfWeek: selectedRow?.dateOfWeek,
    timetable: timeTableData?.timetable ?? selectedRow?.timetable,
  };
  return selectedRowData;
};

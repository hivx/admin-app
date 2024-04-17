import { useLazyGetListTimetableQuery } from '@/api/timeTable';
import { useLazyGetListTimetablePeriodQuery } from '@/api/timetablePeriod';
import { useHospitalProvider } from '@/providers/HospitalConfigProvider';
import { useNotifySnackbar } from '@/providers/NotificationProvider';
import { selectCurrentUser } from '@/stores/auth';
import { ITimeTableDTO } from '@/types/dto/timeTable';
import { ITimeTablePeriodDTO } from '@/types/dto/timeTablePeriod';
import {
  DATE_FORMAT,
  getCurrentDate,
  getCurrentDateTime,
  itechDateTimeToDayjs,
} from '@/utils/dateUtils';

import { useAppSelector, useTranslate } from '..';

/**
 * Hook trả ra Func kiểm tra người dùng có trong ca làm việc hay không ?
 */
export const useUserDuringWorkShift = () => {
  const translate = useTranslate();
  const currentUser = useAppSelector(selectCurrentUser);
  const currentDateTime = getCurrentDateTime();
  const yesterdayString = getCurrentDate().add(-1, 'day').format(DATE_FORMAT);
  const currentDayString = getCurrentDate().format(DATE_FORMAT);
  const [triggerGetListTimeTable] = useLazyGetListTimetableQuery();
  const [triggerGetListTimeTablePeriod] = useLazyGetListTimetablePeriodQuery();
  const notify = useNotifySnackbar();
  const { isEnabledTimetable } = useHospitalProvider();

  /**
   * Vì sẽ có trường hợp ca làm việc kéo dài từ chiều hôm trước -> sáng hôm sau,
   * nên cần có hàm chung, để check với cả 2 mốc thời gian dayString là ngày hôm trước,hôm sau
   */
  const checkTimeIsInShift = (
    /**
     * danh sách các ca trong ngày
     */
    timeTablePeriod: ITimeTablePeriodDTO[],
    /**
     * dayString : có thể là giá trị ngày hôm qua, hoặc hôm nay
     *
     */
    dayString: string,
    /**
     * danh sách ca làm việc của người dùng
     */
    userTimeTable: ITimeTableDTO[],
  ) => {
    const timeTableData = userTimeTable.find((item) => item.id === dayString);
    let hasInShift = false;

    if (!timeTableData) {
      {
        return hasInShift;
      }
    }
    timeTablePeriod.forEach((period) => {
      if (timeTableData.timetable && timeTableData.timetable[period.id]) {
        const fromDateTime = itechDateTimeToDayjs(dayString + period.fromTime);
        const toDateTime = itechDateTimeToDayjs(dayString + period.toTime);
        const newToDateTime = period.consecutive ? toDateTime?.add(1, 'day') : toDateTime;

        if (
          currentDateTime.isAfter(fromDateTime) &&
          currentDateTime.isBefore(newToDateTime)
        ) {
          hasInShift = true;
        }
      } else if (!hasInShift) {
        hasInShift = false;
      }
    });
    return hasInShift;
  };

  /**
   * Kiểm tra tại thời điểm hiện tại Người dùng có trong ca làm việc hay không?
   */
  const checkUserInShift = async () => {
    if (!isEnabledTimetable) {
      return true;
    }
    const { list: userTimeTable } = await triggerGetListTimeTable({
      filter: {
        fromDate: yesterdayString,
        toDate: currentDayString,
        userIDs: currentUser?.id ? [currentUser.id] : [],
      },
    }).unwrap();

    if (!userTimeTable || userTimeTable.length === 0) {
      notifyUserNotInShift();
      return false;
    } else {
      const { list: timeTablePeriod } = await triggerGetListTimeTablePeriod({
        filter: {},
      }).unwrap();

      /**
       * check trường hợp user có lịch làm việc kéo dài từ tối hôm qua -> sáng của ngày tiếp theo
       */
      const isInYesterdayShift = checkTimeIsInShift(
        timeTablePeriod,
        yesterdayString,
        userTimeTable,
      );
      const isInTodayInShift = checkTimeIsInShift(
        timeTablePeriod,
        currentDayString,
        userTimeTable,
      );

      const userInShift = isInTodayInShift || isInYesterdayShift;

      if (!userInShift) {
        notifyUserNotInShift();
      }
      return userInShift;
    }
  };

  const notifyUserNotInShift = async () => {
    notify({
      message: translate.messages.notification.userNotInShift(),
      options: { variant: 'warning' },
    });
  };
  return checkUserInShift;
};

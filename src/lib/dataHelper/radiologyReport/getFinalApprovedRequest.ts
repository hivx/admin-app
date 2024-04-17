import { getApprovedRequests } from '@/lib/dataHelper/radiologyReport/getApprovedRequests';
import { IOrderDTO } from '@/types/dto';
import { itechDateTimeToDayjs } from '@/utils/dateUtils';

/**
 *
 * Filter last request by 'finalApprovedTime'
 * @param requests
 * @returns IOrderRequestDTO
 */
export const getFinalApprovedRequest = (order: IOrderDTO) => {
  const approvedRequests = getApprovedRequests(order);
  /**
   * sort request descendingly
   */
  const sortApprovedRequests = approvedRequests.sort(function (a, b) {
    const dateTime1 = itechDateTimeToDayjs(a.finalApprovedTime) ?? 0;
    const dateTime2 = itechDateTimeToDayjs(b.finalApprovedTime) ?? 0;
    if (dateTime1 > dateTime2) {
      return -1;
    } else {
      return 0;
    }
  });
  return sortApprovedRequests[0];
};

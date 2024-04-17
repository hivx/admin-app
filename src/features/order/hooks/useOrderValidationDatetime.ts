import { Dayjs } from 'dayjs';

import { useAppDispatch, useTranslate } from '@/hooks';
import { useNotifySnackbar } from '@/providers/NotificationProvider';
import { setErrorRadiologyDateTime } from '@/stores/OrderRadiology';
import { IOrderDTO, IOrderRequestDTO } from '@/types/dto';
import { itechDateTimeToDayjs } from '@/utils/dateUtils';

export const useOrderValidationDatetime = ({
  request,
  order,
}: {
  request: IOrderRequestDTO;
  order: IOrderDTO;
}) => {
  const notifySnackbar = useNotifySnackbar();
  const translate = useTranslate();
  const dispatch = useAppDispatch();

  const requestedTimeDayjs = order.requestedTime
    ? itechDateTimeToDayjs(order.requestedTime)
    : null;

  /**
   * Func check thời gian thực hiện có hợp lệ hay không,
   * Điều kiện hợp lệ : TG chỉ định < TG thực hiện < TG Duyệt
   */
  const checkValidationOperationTime = (
    currentOperationTime?: Dayjs | null,
    approveTimeDayjs?: Dayjs | null,
  ) => {
    const isAfterRequestedTime = currentOperationTime?.isAfter(
      requestedTimeDayjs,
      'minute',
    );
    /**
     * Nếu có TG Duyệt, điều kiện phụ thuộc thêm vào TG duyệt
     */
    const isValidOperationTime = approveTimeDayjs
      ? isAfterRequestedTime && currentOperationTime?.isBefore(approveTimeDayjs, 'minute')
      : isAfterRequestedTime;

    if (!isValidOperationTime) {
      dispatch(
        setErrorRadiologyDateTime({
          orderID: order.id,
          requestID: request.id,
          errorOperationTime: true,
        }),
      );
    } else
      dispatch(
        setErrorRadiologyDateTime({
          orderID: order.id,
          requestID: request.id,
          errorOperationTime: false,
        }),
      );
    return isValidOperationTime;
  };

  /**
   * Func check thời gian duyệt có hợp lệ hay không,
   * Điều kiện hợp lệ : TG chỉ định < TG thực hiện < TG Duyệt
   */
  const checkValidationApprovedTime = (
    currentApprovedTime: Dayjs | null,
    operationTimeDayjs?: Dayjs | null,
  ) => {
    /**
     * Không có thời gian duyệt sẽ không phải kiểm tra thêm bất kì điều kiện nào nữa
     */
    if (!currentApprovedTime) {
      return true;
    }
    const isValidApprovedTime =
      currentApprovedTime.isAfter(requestedTimeDayjs, 'minute') &&
      currentApprovedTime.isAfter(operationTimeDayjs, 'minute');
    if (!isValidApprovedTime) {
      dispatch(
        setErrorRadiologyDateTime({
          orderID: order.id,
          requestID: request.id,
          errorApprovedTime: true,
        }),
      );
    } else
      dispatch(
        setErrorRadiologyDateTime({
          orderID: order.id,
          requestID: request.id,
          errorApprovedTime: false,
        }),
      );
    return isValidApprovedTime;
  };

  return {
    checkValidationOperationTime,
    checkValidationApprovedTime,
  };
};

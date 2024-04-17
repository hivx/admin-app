import { useDeleteLockMutation, useGetOneOrderQuery } from '@/api/order';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { useNotifyReportActions } from '@/hooks/order/useNotifyReportActions';
import isOrderDeleteLockable from '@/lib/dataHelper/radiologyReport/isOrderDeleteLockable';
import { selectCurrentUser } from '@/stores/auth';
import {
  selectCurrentRequestID,
  setRadiologyReportSubmissionData,
} from '@/stores/OrderRadiology';
import { IOrderDTO } from '@/types/dto';

export const useDeleteLockOrder = (orderID?: IOrderDTO['id']) => {
  const [triggerDeleteLockOrder] = useDeleteLockMutation();
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectCurrentUser);
  const requestID = useAppSelector(selectCurrentRequestID(orderID ?? 0));

  const { data: order } = useGetOneOrderQuery({ id: orderID ?? 0 }, { skip: !orderID });
  const { notifyDeleteLockSuccess, notifyDeleteLockError } = useNotifyReportActions();

  const deletable = isOrderDeleteLockable({ order, currentUser: user });

  /**
   * use to delete lock order by orderID
   */
  const deleteLockOrder = async () => {
    if (order?.id) {
      const res = await triggerDeleteLockOrder(order?.id);
      if ('error' in res) {
        notifyDeleteLockError();
      } else {
        dispatch(
          setRadiologyReportSubmissionData({
            orderID: order?.id,
            requestID: requestID,
            operationTime: '',
            approvedTime: '',
          }),
        );
        notifyDeleteLockSuccess();
      }
    }
  };

  return { deletable, deleteLockOrder };
};

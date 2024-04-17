import { useCreateLockMutation, useLazyGetOneOrderQuery } from '@/api/order';
import { useLazyGetOneOrderRequestQuery } from '@/api/orderRequest';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { useNotifyReportActions } from '@/hooks/order/useNotifyReportActions';
import { getIsOrderLockAbleLazy } from '@/lib/dataHelper/radiologyReport/validateLockOrder';
import { selectCurrentUser } from '@/stores/auth';
import { setRadiologyReportIsApproveButtonClicked } from '@/stores/OrderRadiology';
import { IOrderDTO, IOrderRequestDTO } from '@/types/dto';

/**
 * Define lock order function
 */
export const useLockOrder = () => {
  const user = useAppSelector(selectCurrentUser);
  const [triggerGetOneOrder] = useLazyGetOneOrderQuery();
  const [triggerGetOneOrderRequest] = useLazyGetOneOrderRequestQuery();
  const [triggerLockOrder] = useCreateLockMutation();
  const dispatch = useAppDispatch();

  const notifyReportActions = useNotifyReportActions();

  const handleLockOrder = async (
    orderID: IOrderDTO['id'],
    requestID?: IOrderRequestDTO['id'],
  ) => {
    if (user) {
      const getOrderFn = () => triggerGetOneOrder({ id: orderID }).unwrap();
      const getRequestFn = requestID
        ? () => triggerGetOneOrderRequest({ orderID, requestID }).unwrap()
        : undefined;
      // run check before lockorder
      const isLockAble = await getIsOrderLockAbleLazy({
        getOrderFn,
        currentUser: user,
        getRequestFn,
      });
      if (isLockAble) {
        const result = triggerLockOrder({ id: orderID });
        if ('error' in result) {
          notifyReportActions.notifyLockError();
          return false;
        } else {
          notifyReportActions.notifyLockSuccess();
          /**
           * Reset click state of approve button
           * https://docs.google.com/spreadsheets/d/1vjVNLf4Pby7jfZp6xxsHRKh7KmTfBsp7OoSYtGYCgyU/edit#gid=473612909
           */
          dispatch(
            setRadiologyReportIsApproveButtonClicked({
              orderID,
              isApproveButtonClicked: false,
            }),
          );
          return true;
        }
      }
    }
    return false;
  };
  return handleLockOrder;
};

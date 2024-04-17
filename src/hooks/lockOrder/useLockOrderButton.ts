import { useEffect } from 'react';

import { useLazyGetOneModalityTypeByNameQuery } from '@/api/modalityType';
import { useGetOneOrderQuery } from '@/api/order';
import {
  useGetOneOrderRequestQuery,
  useLazyGetOneOrderRequestQuery,
} from '@/api/orderRequest';
import { useAppDispatch, useAppSelector } from '@/hooks';
import { getIsEnableLockOrder } from '@/lib/dataHelper/radiologyReport/validateLockOrder';
import { useUserPermission } from '@/providers/AuthProvider';
import { selectCurrentUser } from '@/stores/auth';
import { BUTTON_STATE } from '@/types';
import { IOrderDTO } from '@/types/dto';
import { getDefaultOperationTimeSubmissionData } from '@/utils/radiology/getRadiologyTime';

import { useCurrentOrderID } from '../../features/order/providers';
import {
  selectCurrentRequestID,
  selectRadiologyReportButtonsState,
  setRadiologyReportButtonState,
  setRadiologyReportSubmissionData,
} from '../../stores/OrderRadiology';

import { useLockOrder } from './useLockOrder';

export const useLockOrderButton = (selectedRow?: IOrderDTO) => {
  const [triggerGetModalityType] = useLazyGetOneModalityTypeByNameQuery();
  const currentOrderID = useCurrentOrderID();
  const orderID = selectedRow?.id ?? currentOrderID;
  const { data: order } = useGetOneOrderQuery({ id: orderID }, { skip: !orderID });

  const execOrder = selectedRow ?? order;
  const requestID =
    useAppSelector(selectCurrentRequestID(orderID)) ??
    (execOrder?.requests && execOrder?.requests[0].id);

  const [triggerGetRequest] = useLazyGetOneOrderRequestQuery();

  const { data: request } = useGetOneOrderRequestQuery(
    {
      orderID: order?.id ?? 0,
      requestID,
    },
    { skip: !order?.id || !requestID },
  );

  const user = useAppSelector(selectCurrentUser);
  const buttonState = useAppSelector(selectRadiologyReportButtonsState(orderID, 'LOCK'));
  const dispatch = useAppDispatch();
  const permission = useUserPermission();

  const handleLockOrder = useLockOrder();
  /**
   * Thời gian thực hiện ca chụp bắt đầu từ khi nhận ca
   */
  const lockOrderAndSetOperationTime = async () => {
    const isLocked = await handleLockOrder(orderID, requestID);
    const request = await triggerGetRequest({ orderID, requestID }, true).unwrap();

    if (isLocked && execOrder?.modalityType && request) {
      const modalityType = await triggerGetModalityType(
        {
          name: execOrder.modalityType,
        },
        true,
      ).unwrap();
      dispatch(
        setRadiologyReportSubmissionData({
          orderID,
          requestID,
          operationTime: getDefaultOperationTimeSubmissionData({
            modalityType,
            request,
            operationTimeReportSubmission: undefined,
          }),
        }),
      );
    }

    return isLocked;
  };

  useEffect(() => {
    if (execOrder && user && request) {
      let buttonState = BUTTON_STATE.DISABLED;
      if (getIsEnableLockOrder(permission, request)) {
        buttonState = BUTTON_STATE.ACTIVE;
      }
      dispatch(
        setRadiologyReportButtonState({ orderID, button: 'LOCK', state: buttonState }),
      );
    }
  }, [dispatch, execOrder, orderID, permission, request, user]);

  return {
    buttonState: buttonState || BUTTON_STATE.DISABLED,
    onClick: () => lockOrderAndSetOperationTime(),
    requestID,
  };
};

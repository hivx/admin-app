import { useEffect } from 'react';

import { useGetOneOrderQuery } from '@/api/order';
import { useAppDispatch, useAppSelector } from '@/hooks';
import isOrderDeleteLockable from '@/lib/dataHelper/radiologyReport/isOrderDeleteLockable';
import { selectCurrentUser } from '@/stores/auth';
import { BUTTON_STATE } from '@/types';

import { useCurrentOrderID } from '../../features/order/providers';
import {
  selectCurrentRequestID,
  selectRadiologyReportButtonsState,
  setRadiologyReportButtonState,
} from '../../stores/OrderRadiology';

import { useDeleteLockOrder } from './useDeleteLockOrder';

export const useCheckDeletableLockOrder = () => {
  // check if a lock order can delete or not
  const orderID = useCurrentOrderID();

  const { data: order } = useGetOneOrderQuery({ id: orderID });
  const user = useAppSelector(selectCurrentUser);

  const deletable = isOrderDeleteLockable({ order, currentUser: user });
  return {
    deletable,
  };
};

export const useDeleteLockOrderButton = () => {
  // set button state for delete lock order button + onClick function
  const orderID = useCurrentOrderID();
  const requestID = useAppSelector(selectCurrentRequestID(orderID));
  const { data: order } = useGetOneOrderQuery({ id: orderID });
  const user = useAppSelector(selectCurrentUser);
  const buttonState = useAppSelector(
    selectRadiologyReportButtonsState(orderID, 'DELETE_LOCK'),
  );
  const { deletable, deleteLockOrder } = useDeleteLockOrder(order?.id);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (order && user) {
      let buttonState = BUTTON_STATE.DISABLED;
      if (deletable) {
        buttonState = BUTTON_STATE.ACTIVE;
      }
      dispatch(
        setRadiologyReportButtonState({
          orderID,
          button: 'DELETE_LOCK',
          state: buttonState,
        }),
      );
    }
  }, [deletable, dispatch, order, orderID, user]);

  return {
    buttonState: buttonState || BUTTON_STATE.DISABLED,
    onClick: () => deleteLockOrder(),
    requestID,
  };
};

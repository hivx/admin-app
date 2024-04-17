import { useEffect } from 'react';

import { useGetOneOrderRequestQuery } from '@/api/orderRequest';
import { useCurrentOrderID } from '@/features/order';
import { useAppDispatch, useAppSelector, useTranslate } from '@/hooks';
import { getIsEnableApproveOrder } from '@/lib/dataHelper/radiologyReport/validateApproveOrder';
import { useUserPermission } from '@/providers/AuthProvider';
import {
  selectCurrentRequestID,
  selectRadiologyReportButtonsState,
  setRadiologyReportButtonState,
} from '@/stores/OrderRadiology';
import { BUTTON_STATE } from '@/types';
import { IOrderDTO, IOrderRequestDTO, IUserDTO } from '@/types/dto';
import { IRadiologyReportButtonHandler } from '@/types/order/buttons';
import { RadiologyReportActions } from '@/types/radiology/reportContext';

type ApproveReportButtonState = Pick<IRadiologyReportButtonHandler, 'buttonState'> & {
  buttonLabel: string;
};
type getButtonStateProps = {
  user: IUserDTO | null;
  order?: IOrderDTO;
  request?: IOrderRequestDTO;
  isReApproveable: boolean;
};
/**
 * @returns state of button Approve
 */
const getButtonState = (props: getButtonStateProps): BUTTON_STATE => {
  const { isReApproveable, order, request, user } = props;
  let buttonState = BUTTON_STATE.DISABLED;
  if (order && user) {
    if (order.reportStatus === 'NOT_READY') {
      buttonState = BUTTON_STATE.HIDDEN;
      return buttonState;
    }

    if (user?.type === 'IMAGING_DOCTOR') {
      buttonState = BUTTON_STATE.ACTIVE;
    }
    const hasLock = order.lockedBy?.id === user?.id;
    if (hasLock) {
      if (request?.finalReportID) {
        // if final report exists, check if report is re approve-able and set state
        buttonState = isReApproveable ? BUTTON_STATE.ACTIVE : BUTTON_STATE.DISABLED;
      } else {
        buttonState = BUTTON_STATE.ACTIVE;
      }
    } else {
      buttonState = BUTTON_STATE.HIDDEN;
    }
    return buttonState;
  }
  return buttonState;
};

export const useApproveButtonState = (
  buttonType: RadiologyReportActions | `${RadiologyReportActions}`,
): ApproveReportButtonState => {
  const orderID = useCurrentOrderID();
  const requestID = useAppSelector(selectCurrentRequestID(orderID));
  const { data: currentRequest } = useGetOneOrderRequestQuery(
    { orderID, requestID },
    { skip: !orderID || !requestID },
  );
  const permissions = useUserPermission();
  const translate = useTranslate();
  const dispatch = useAppDispatch();
  const approveButtonState = useAppSelector(
    selectRadiologyReportButtonsState(orderID, buttonType),
  );

  useEffect(() => {
    let buttonState = BUTTON_STATE.DISABLED;
    if (currentRequest) {
      if (getIsEnableApproveOrder(permissions, currentRequest))
        buttonState = BUTTON_STATE.ACTIVE;
      dispatch(
        setRadiologyReportButtonState({
          orderID,
          button: buttonType,
          state: buttonState,
        }),
      );
    }
  }, [buttonType, currentRequest, dispatch, orderID, permissions]);

  return {
    buttonState: approveButtonState || BUTTON_STATE.DISABLED,
    buttonLabel: translate.pages.orderReport.actions.approve(),
  };
};

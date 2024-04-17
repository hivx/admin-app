import { styled } from '@mui/material';
import React, { ReactNode } from 'react';

import { useGetOneOrderQuery } from '@/api/order';
import { useGetOneOrderRequestQuery } from '@/api/orderRequest';
import { MyButtonGroup } from '@/components';
import { useAppSelector } from '@/hooks';
import {
  getOrderLockStatus,
  LOCK_ORDER_VALIDATION_RESULT,
} from '@/lib/dataHelper/radiologyReport/validateLockOrder';
import { useUserPermission } from '@/providers/AuthProvider';
import { selectCurrentUser } from '@/stores/auth';
import {
  selectCurrentRequestID,
  selectRadiologyReportIsApproveButtonClicked,
  selectRadiologyReportSubmission,
} from '@/stores/OrderRadiology';
import { BaseEntity } from '@/types';
import { IOrderDTO, IOrderRequestDTO, IUserDTO } from '@/types/dto';

import { useCurrentOrderID } from '../../../../providers';

import { CombinedApproveButton } from './CombinedApproveButton';
import { CombinedSaveDraftButton } from './CombinedSaveDraftButton';
import { LockAndDeleteLockOrderButton } from './LockAndDeleteLockOrderButton';

/**
 * SWITCH component to select the correct button
 */
export const MainButtonSwitcher = () => {
  const orderID = useCurrentOrderID();
  const { data: order } = useGetOneOrderQuery({ id: orderID }, { skip: !orderID });
  const requestID = useAppSelector(selectCurrentRequestID(orderID));
  const radiologyReportSubmission = useAppSelector(
    selectRadiologyReportSubmission({ orderID, requestID }),
  );
  const { data: request } = useGetOneOrderRequestQuery(
    {
      orderID,
      requestID,
    },
    { skip: !orderID || !requestID },
  );
  const user = useAppSelector(selectCurrentUser);
  const permission = useUserPermission();
  const isApproveButtonClicked = useAppSelector(
    selectRadiologyReportIsApproveButtonClicked(orderID),
  );

  if (user && order && request && user) {
    const button = getButton({
      order,
      request,
      currentUser: user,
      permission,
      isApproveButtonClicked,
      user,
    });

    return <StyledMyButtonGroup>{renderButton(button)}</StyledMyButtonGroup>;
  }
  return <></>;
};

const StyledMyButtonGroup = styled(MyButtonGroup)`
  min-width: 75px;
  &:empty {
    min-width: 0;
  }
`;

/**
 * List of buttons to return
 */
enum RENDER_BUTTONS {
  /**
   * Nhận ca
   */
  LOCK_ORDER = 'LOCK_ORDER',
  /**
   * Lưu nháp
   */
  SAVE_DRAFT = 'SAVE_DRAFT',
  /**
   * Duyệt
   */
  APPROVE = 'APPROVE',
  /**
   * Bỏ nhận ca
   */
  UNLOCK_ORDER = 'UNLOCK_ORDER',
  /**
   * Không hiện nút
   */
  EMPTY = 'EMPTY',
}

type GetButtonOptions = {
  currentUser: IUserDTO;
  permission: ReturnType<typeof useUserPermission>;
  order: IOrderDTO;
  request: IOrderRequestDTO;
  isApproveButtonClicked: boolean;
  user: IUserDTO;
};

const renderButton = (button: RENDER_BUTTONS): ReactNode => {
  switch (button) {
    case RENDER_BUTTONS.APPROVE:
      return <CombinedApproveButton />;
    case RENDER_BUTTONS.LOCK_ORDER:
      return <LockAndDeleteLockOrderButton />;
    case RENDER_BUTTONS.SAVE_DRAFT:
      return <CombinedSaveDraftButton />;
    case RENDER_BUTTONS.UNLOCK_ORDER:
      return <LockAndDeleteLockOrderButton />;
    case RENDER_BUTTONS.EMPTY:
      return <></>;
  }
};
const getButton = (options: GetButtonOptions): RENDER_BUTTONS => {
  const { permission, order, currentUser, user, request } = options;

  if (!permission?.userCanLockOrder) return RENDER_BUTTONS.EMPTY;

  switch (getOrderLockStatus(order, currentUser)) {
    case LOCK_ORDER_VALIDATION_RESULT.LOCKED_SAME_USER:
      break;
    case LOCK_ORDER_VALIDATION_RESULT.LOCKED_HIGHER_LEVEL:
    case LOCK_ORDER_VALIDATION_RESULT.LOCKED_LOWER_LEVEL:
    case LOCK_ORDER_VALIDATION_RESULT.UNLOCKED:
      return RENDER_BUTTONS.LOCK_ORDER;
  }

  if (
    !permission.userCanApproveOrder ||
    (request.finalApproverID && user.id !== request.finalApproverID)
  )
    return RENDER_BUTTONS.SAVE_DRAFT;
  else return RENDER_BUTTONS.APPROVE;
};

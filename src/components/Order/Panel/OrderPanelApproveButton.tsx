import React, { FC, MouseEvent } from 'react';
import { useParams } from 'react-router-dom';

import { DynamicPanelHeaderButton } from '@/components/Layout/DynamicSidepanel/DynamicPanelHeaderButton';
import { useTranslate } from '@/hooks';
import {
  OrderPanelApproveButtonProps,
  useQuickApproveButton,
} from '@/hooks/dynamicSidepanelDataController/useQuickApproveButton';
import { useNotifyModal } from '@/providers/NotificationProvider';
import { BUTTON_STATE } from '@/types';

import { ItechConfirmEditIcon } from '../../../assets/icon';

export const OrderPanelApproveButton: FC<OrderPanelApproveButtonProps> = ({
  order,
  reportID,
  request,
}) => {
  const translate = useTranslate();
  const notifyModal = useNotifyModal();
  const { orderID } = useParams();
  const { dynamicApproveButtonState, onClickApprove } = useQuickApproveButton({
    order,
    request,
    reportID,
  });

  /**
   * func với popup xác nhận trước khi Duyệt
   */
  const preOnClickApprove = (e: MouseEvent<HTMLButtonElement>) => {
    notifyModal({
      message: translate.messages.notification.confirmApprove(),
      options: {
        variant: 'warning',
        onConfirm: () => onClickApprove(e),
      },
    });
  };

  /**
   * Không hiện nút Duyệt ở Dynamic site trong màn Viết kết quả
   */
  return !orderID ? (
    <DynamicPanelHeaderButton
      title={translate.buttons.approveSavedReport()}
      onClick={preOnClickApprove}
      disabled={dynamicApproveButtonState === BUTTON_STATE.DISABLED}
      IconComponent={ItechConfirmEditIcon}
    />
  ) : (
    <></>
  );
};

import React, { FC } from 'react';

import { ItechConfirmEditIcon } from '@/assets/icon';
import { IconButtonWithToolTip } from '@/components/Elements/Buttons/IconButtonWithToolTip';
import { TableSVGIcon } from '@/components/Table/TableSVGIcon';
import { useAppSelector, useTranslate } from '@/hooks';
import { useQuickApproveButton } from '@/hooks/dynamicSidepanelDataController/useQuickApproveButton';
import {
  selectCurrentActiveReportID,
  selectRadiologyReportSubmission,
} from '@/stores/OrderRadiology';
import { BUTTON_STATE } from '@/types';
import { IOrderDTO, IOrderRequestDTO } from '@/types/dto';

type QuickApproveReportButtonProps = {
  order: IOrderDTO;
  request: IOrderRequestDTO;
};

/**
 * Nút Duyệt kết quả đã lưu nháp ở màn đọc ca chậm
 */
export const QuickApproveReportButton: FC<QuickApproveReportButtonProps> = ({
  order,
  request,
}) => {
  const currentActiveReportID =
    useAppSelector(selectCurrentActiveReportID(order.id)) ?? undefined;
  const reportSubmission = useAppSelector(
    selectRadiologyReportSubmission({ orderID: order.id, requestID: request.id }),
  );

  const { dynamicApproveButtonState, onClickApprove } = useQuickApproveButton({
    order,
    request,
    reportID: currentActiveReportID,
    localSubmissionData: reportSubmission,
  });

  const translate = useTranslate();
  return (
    <IconButtonWithToolTip
      title={translate.buttons.approveSavedReport()}
      onClick={onClickApprove}
      color="inherit"
      disabled={dynamicApproveButtonState === BUTTON_STATE.DISABLED}
    >
      <TableSVGIcon IconComponent={ItechConfirmEditIcon} />
    </IconButtonWithToolTip>
  );
};

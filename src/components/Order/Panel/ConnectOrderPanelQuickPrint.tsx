import React from 'react';

import ItechPrintApproveIcon from '@/assets/icon/PrintApproveIcon';
import { DynamicPanelHeaderButton } from '@/components/Layout/DynamicSidepanel/DynamicPanelHeaderButton';
import { useTranslate } from '@/hooks';
import { useQuickPrintReportButton } from '@/hooks/order/useQuickPrintReportButton';
import { BUTTON_STATE } from '@/types';
import { IOrderDTO, IOrderRequestDTO } from '@/types/dto';

/**
 * Nút in kết quả ở Dynamic side
 */
export const ConnectOrderPanelQuickPrint = ({
  order,
  request,
}: {
  order?: IOrderDTO;
  request?: IOrderRequestDTO;
}) => {
  const translate = useTranslate();

  const { onClick: quickPrintReport, buttonState } = useQuickPrintReportButton(
    order,
    request,
  );
  /**
   * Check status button using for active/inactive
   */
  const isActive = buttonState === BUTTON_STATE.ACTIVE;

  return (
    <DynamicPanelHeaderButton
      title={translate.buttons.printRadiologyReport()}
      onClick={() => quickPrintReport()}
      disabled={!isActive}
      IconComponent={ItechPrintApproveIcon}
    />
  );
};

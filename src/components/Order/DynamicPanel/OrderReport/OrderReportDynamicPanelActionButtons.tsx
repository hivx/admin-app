import React, { FC } from 'react';

import { IOrderDTO, IOrderRequestDTO, IRadiologyReportDTO } from '@/types/dto';

import { ConnectOrderPanelPrintPreviewButton } from '../../Panel/ConnectOrderPanelPrintPreviewButton';
import { ConnectOrderPanelQuickPrint } from '../../Panel/ConnectOrderPanelQuickPrint';
import { CopyReportContentButton } from '../../Panel/CopyReportContentButton';
import { OrderPanelApproveButton } from '../../Panel/OrderPanelApproveButton';
import OrderPanelPrintImageButton from '../../Panel/OrderPanelPrintImageButton';
// import { QuickReportButton } from '../../Panel/QuickReportButton';

type OrderReportDynamicPanelActionButtonsProps = {
  order?: IOrderDTO;
  request?: IOrderRequestDTO;
  reportID?: IRadiologyReportDTO['id'];
};
export const OrderReportDynamicPanelActionButtons: FC<
  OrderReportDynamicPanelActionButtonsProps
> = (props) => {
  const { order, request, reportID } = props;
  return (
    <>
      {/* <QuickReportButton order={order} request={request} reportID={reportID} /> */}
      <ConnectOrderPanelQuickPrint order={order} request={request} />
      {order && request && reportID && (
        <OrderPanelApproveButton order={order} request={request} reportID={reportID} />
      )}
      <OrderPanelPrintImageButton order={order} />
      {order && (
        <ConnectOrderPanelPrintPreviewButton
          order={order}
          reportID={reportID}
          requestID={request?.id}
        />
      )}
      {order && request && reportID && (
        <CopyReportContentButton order={order} request={request} reportID={reportID} />
      )}
    </>
  );
};

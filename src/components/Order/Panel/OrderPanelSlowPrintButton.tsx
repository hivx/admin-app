import { FC } from 'react';

import ItechPrintApproveIcon from '@/assets/icon/PrintApproveIcon';
import { DynamicPanelHeaderButton } from '@/components/Layout/DynamicSidepanel/DynamicPanelHeaderButton';
import { IOrderDTO, IOrderRequestDTO } from '@/types/dto';

import { PrintRadiologyReportButton } from '../../../features/order/components/RadiologyReport/Buttons/PrintRadiologyReportButton';

type OrderPanelSlowPrintButtonProps = {
  order?: IOrderDTO;
  request?: IOrderRequestDTO;
};

/**
 * Nút in ở Dynamic side
 */
const OrderPanelSlowPrintButton: FC<OrderPanelSlowPrintButtonProps> = ({
  order,
  request,
}) => {
  return order ? (
    <PrintRadiologyReportButton
      order={order}
      requestID={request?.id}
      renderButton={(props) => (
        <DynamicPanelHeaderButton {...props} IconComponent={ItechPrintApproveIcon} />
      )}
    />
  ) : (
    <></>
  );
};

export default OrderPanelSlowPrintButton;

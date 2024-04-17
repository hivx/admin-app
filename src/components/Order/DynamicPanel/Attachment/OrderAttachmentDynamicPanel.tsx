import React, { FC } from 'react';

import { IOrderDTO } from '@/types/dto';

import { AttachmentTable } from '../../AttachmentModal/AttachmentTable';
import { SidePanelDisplayTable } from '../SidePanelDisplayTable';

type OrderAttachmentDynamicPanelProps = {
  order?: IOrderDTO;
};

const OrderAttachmentDynamicPanel: FC<OrderAttachmentDynamicPanelProps> = (props) => {
  const { order } = props;
  return (
    <SidePanelDisplayTable
      TableComponent={<AttachmentTable orderID={order?.id ?? 0} />}
    />
  );
};

export default OrderAttachmentDynamicPanel;

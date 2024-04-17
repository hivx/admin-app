import { FC } from 'react';

import { DynamicSidepanelController } from '@/components/Layout/DynamicSidepanel/DynamicSidepanelController';
import { useGetOrderDynamicSidepanels } from '@/hooks/useGetOrderDynamicSidepanels';
import { IOrderDTO, USER_MODULE } from '@/types/dto';

type OrderListDynamicSidepanelProps = {
  order?: IOrderDTO;
};

/**
 * Prepare common data for order list sidepanels
 */
export const OrderListDynamicSidepanel: FC<OrderListDynamicSidepanelProps> = (props) => {
  const { order } = props;
  const sidepanels = useGetOrderDynamicSidepanels(USER_MODULE.REPORTING, order);

  return (
    <DynamicSidepanelController page={USER_MODULE.REPORTING} sidepanels={sidepanels} />
  );
};

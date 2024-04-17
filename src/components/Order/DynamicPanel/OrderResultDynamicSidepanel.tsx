import { FC } from 'react';

import { DynamicSidepanelController } from '@/components/Layout/DynamicSidepanel/DynamicSidepanelController';
import { useGetOrderDynamicSidepanels } from '@/hooks/useGetOrderDynamicSidepanels';
import { IOrderDTO, USER_MODULE } from '@/types/dto';

type OrderResultDynamicSidepanelProps = {
  order?: IOrderDTO;
};

/**
 * Prepare common data for order list sidepanels
 */
export const OrderResultDynamicSidepanel: FC<OrderResultDynamicSidepanelProps> = (
  props,
) => {
  const { order } = props;
  const sidepanels = useGetOrderDynamicSidepanels(USER_MODULE.PUBLICATION, order);

  return (
    <DynamicSidepanelController page={USER_MODULE.PUBLICATION} sidepanels={sidepanels} />
  );
};

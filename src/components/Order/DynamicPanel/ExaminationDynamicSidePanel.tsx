import { FC } from 'react';

import { DynamicSidepanelController } from '@/components/Layout/DynamicSidepanel/DynamicSidepanelController';
import { useGetOrderDynamicSidepanels } from '@/hooks/useGetOrderDynamicSidepanels';
import { IOrderDTO, USER_MODULE } from '@/types/dto';

type ExaminationDynamicSidePanelProps = {
  order?: IOrderDTO;
};

/**
 * Prepare common data for order list sidepanels
 */
export const ExaminationDynamicSidePanel: FC<ExaminationDynamicSidePanelProps> = (
  props,
) => {
  const { order } = props;
  const sidepanels = useGetOrderDynamicSidepanels(USER_MODULE.EXAMINATION, order);

  return (
    <DynamicSidepanelController page={USER_MODULE.EXAMINATION} sidepanels={sidepanels} />
  );
};

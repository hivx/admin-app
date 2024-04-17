import React from 'react';

import { getDynamicSidePanels } from '@/components/Layout/DynamicSidepanel/DynamicSidePanelConfig';
import { DynamicSidepanelController } from '@/components/Layout/DynamicSidepanel/DynamicSidepanelController';
import { IOrderDTO, USER_MODULE } from '@/types/dto';

import { useOrderDynamicSidepanelData } from './dynamicSidepanelDataController/useOrderDynamicSidepanelData';
import { useGetListExtension } from './useGetListExtension';
import { useTranslate } from './useTranslate';

// get Order-based list dynamic panels based on module
export const useGetOrderDynamicSidepanels = (
  page: USER_MODULE,
  order?: IOrderDTO,
): React.ComponentProps<typeof DynamicSidepanelController>['sidepanels'] => {
  const translate = useTranslate();
  const sidePanelData = useOrderDynamicSidepanelData({ order });
  const extensions = useGetListExtension(page);
  const sidepanels = getDynamicSidePanels({ extensions, sidePanelData, translate });
  return sidepanels;
};

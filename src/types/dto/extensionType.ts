import { Nullable } from '@/types';

import { SIDEPANEL_IDS } from '../dynamicSidepanel/sidebarPanels';

export type IExtensionTypeDTOBase = {
  description: string;
  name: string;
};

export type IExtensionTypeDTO = Nullable<IExtensionTypeDTOBase> & { id: SIDEPANEL_IDS };

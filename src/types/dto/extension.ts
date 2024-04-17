import { BaseEntity } from '@/types';

import { SIDEPANEL_IDS } from '../dynamicSidepanel/sidebarPanels';

export type IExtensionDTOBase = {
  config: string | null;
  extensionType: SIDEPANEL_IDS;
  fullscreen: boolean;
  hospitalID: string;
  index: number;
  runInBackground: boolean;
  activeOnInit: boolean;
  uuid: string;
};

/**
 * Guaranteed to not be nullable
 */
export type IExtensionDTO = IExtensionDTOBase & BaseEntity;

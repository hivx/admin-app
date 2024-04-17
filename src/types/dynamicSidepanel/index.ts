import { ReactElement, ReactEventHandler } from 'react';
import { LocalizedString } from 'typesafe-i18n';

import { IExtensionDTO, USER_MODULE } from '../dto';

import { SIDEPANEL_IDS } from './sidebarPanels';

export type PanelComponent = {
  /**
   * Main component
   */
  MainComponent: ReactElement;
  /**
   * Icon to display in the sidebar
   */
  IconComponent: ReactElement;
  /**
   * Tooltip to display when hover on icon
   */
  title: string | LocalizedString;
};

/**
 * The definition of a child Sidepanel item
 * The Sidepanel item should be defined to always fill width/height of the parent
 */
export type ISidepanel = {
  /**
   * Panel config from back end
   */
  config: IExtensionDTO;
} & PanelComponent;

/**
 * Use redux to reconstruct layout if the user returns to the page
 */
export type ISidepanelReduxLayout = {
  id: SIDEPANEL_IDS;
  /**
   * Determine if the panel is currently displaying
   */
  isActive: boolean;
  /**
   * Height ratio of the panel
   */
  ratio: number;

  config: IExtensionDTO;
};

/**
 * We need to display a unique sidepanel for each page,
 * therefore we need to register every page that uses the sidebar
 */
export type IDynamicSidePanelReduxState = Record<USER_MODULE, ISidepanelReduxLayout[]>;

type ISidepanelHandler = {
  onIconClick: ReactEventHandler<HTMLButtonElement>;
};

/**
 * Information to render the sidepanels
 */
export type ISidepanelLayout = ISidepanelReduxLayout & ISidepanel & ISidepanelHandler;

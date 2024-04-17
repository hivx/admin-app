import { MouseEvent, useCallback } from 'react';

import {
  closeContextMenu,
  IContextMenuState,
  openContextMenu,
  toggleContextMenu,
  updateContextMenuPosition,
  DEFAULT_MENU_ID,
} from '@/stores/contextMenu/contextMenuSlice';

import { useAppDispatch } from '.';

type UseContextMenuReturn = {
  /**
   * Open new context menu with optional metadata
   *
   * Must define meta type first in contextMenuSlice
   *
   * @example
   * // contextMenuSlice.ts
   * type MetadataType = { name: string };
   * type MenuContext = {
   *    MyMenu: MetadataType;
   * };
   * // Usage
   * const meta: MetadataType = { name: 'my new menu' };
   * open(e, meta);
   */
  open: (e: MouseEvent, meta?: IContextMenuState['meta']) => void;
  close: () => void;
  toggle: (e: MouseEvent) => void;
};

/**
 * In case there are multiple configured context menus
 * we use this prop to differentiate between menus
 * @default contextmenu
 */
type UseContextMenu = (menuID?: string) => UseContextMenuReturn;

export const useContextMenu: UseContextMenu = (menuID = DEFAULT_MENU_ID) => {
  const dispatch = useAppDispatch();

  const open = useCallback<UseContextMenuReturn['open']>(
    (e, meta) => {
      dispatch(updateContextMenuPosition({ x: e.pageX, y: e.pageY }));
      dispatch(openContextMenu({ menuID, meta }));
    },
    [dispatch, menuID],
  );

  const close = useCallback<UseContextMenuReturn['close']>(() => {
    dispatch(closeContextMenu(menuID));
  }, [dispatch, menuID]);

  const toggle = useCallback<UseContextMenuReturn['toggle']>(
    (e) => {
      dispatch(updateContextMenuPosition({ x: e.screenX, y: e.screenY }));
      dispatch(toggleContextMenu(menuID));
    },
    [dispatch, menuID],
  );
  return { open, close, toggle };
};

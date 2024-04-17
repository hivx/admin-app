import { ClickAwayListener } from '@mui/material';
import { FC, ReactNode, useMemo } from 'react';

import { useAppSelector } from '@/hooks';
import { useContextMenu } from '@/hooks/useContextMenu';
import {
  selectContextMenuOpenState,
  selectContextMenuPosition,
} from '@/stores/contextMenu/contextMenuSlice';

import { ContextPopper } from './ContextPopper';
import { MyMenuList } from './MyMenuList';

type ContextPopupControllerProps = {
  /**
   * In case there are multiple configured context menus
   * we use this prop to differentiate between menus
   */
  menuID?: string;
  /**
   * We can render the popup container as Menu or Popper
   * Menu children is always a MenuList component while
   * Popper does not have a defined children --> more flexible
   */
  type: 'menu' | 'popper';
  children?: ReactNode;
};

type VirtualElement = {
  getBoundingClientRect: () => ClientRect | DOMRect;
  contextElement?: Element;
};

export const ContextPopupController: FC<ContextPopupControllerProps> = (props) => {
  const { menuID, type } = props;
  const isOpen = useAppSelector(selectContextMenuOpenState(menuID));
  const position = useAppSelector(selectContextMenuPosition);
  const { close } = useContextMenu(menuID);
  /**
   * create virtual element for popper positioning
   */
  const virtualElement = useMemo<VirtualElement>(() => {
    const getBoundingClientRect = () =>
      ({
        width: 0,
        height: 0,
        x: position.x,
        y: position.y,
        top: position.y,
        right: position.x,
        bottom: position.y,
        left: position.x,
      } as DOMRect);
    return { getBoundingClientRect };
  }, [position.x, position.y]);

  const Content =
    type === 'popper' ? (
      <ContextPopper isOpen={isOpen} anchorEl={virtualElement}>
        {props.children}
      </ContextPopper>
    ) : (
      <ContextPopper isOpen={isOpen} anchorEl={virtualElement}>
        <MyMenuList>{props.children}</MyMenuList>
      </ContextPopper>
    );

  return <ClickAwayListener onClickAway={close}>{Content}</ClickAwayListener>;
};

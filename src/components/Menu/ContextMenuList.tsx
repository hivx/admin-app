import { MenuList, PopperProps } from '@mui/material';
import { FC, forwardRef, ReactNode } from 'react';

import { ContextMenuContentShell } from './ContextMenuContentShell';

type ContextMenuProps = {
  isOpen: boolean;
  anchorEl: PopperProps['anchorEl'];
  children?: ReactNode;
};

export const ContextMenuList: FC<ContextMenuProps> = forwardRef<
  HTMLDivElement,
  ContextMenuProps
>((props) => {
  return (
    <MenuList>
      <ContextMenuContentShell>{props.children}</ContextMenuContentShell>
    </MenuList>
  );
});

ContextMenuList.displayName = 'ContextMenuList';

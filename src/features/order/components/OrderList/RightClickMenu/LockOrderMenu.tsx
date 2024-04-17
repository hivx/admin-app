import React from 'react';

import { ItechOpenOrderIcon } from '@/assets/icon';
import { ContextMenuItemShell } from '@/components/Menu/ContextMenuItemShell';
import { HOTKEYS } from '@/config';
import { useTranslate } from '@/hooks';
import { IOrderDTO } from '@/types/dto';

import { useOpenOrderInNewTab } from '../../../hooks/useOpenOrderInNewTab';

export const OpenOrderMenuItem = ({
  metadata,
  closeMenu,
}: {
  metadata: IOrderDTO;
  closeMenu: () => void;
}) => {
  const translate = useTranslate();

  const handleOpenOrderInNewTab = useOpenOrderInNewTab({
    order: metadata,
    callbackFunc: closeMenu,
  });

  return (
    <ContextMenuItemShell
      IconComponent={<ItechOpenOrderIcon fontSize="small" color="inherit" />}
      MenuItemProps={{
        onClick: handleOpenOrderInNewTab,
        disabled: !metadata,
      }}
      MainComponent={translate.buttons.openOrder()}
      hotkeyString={HOTKEYS.OPEN_ORDER.title}
    />
  );
};

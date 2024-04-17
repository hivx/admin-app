import React from 'react';

import { ItechSaveBookmarkIcon } from '@/assets/icon';
import { ContextMenuItemShell } from '@/components/Menu/ContextMenuItemShell';
import { HOTKEYS } from '@/config';
import { useTranslate } from '@/hooks';
import { useBookmarkButton } from '@/hooks/useBookmarkButton';
import { IOrderDTO } from '@/types/dto';

export const SaveBookmarkMenuItem = (props: {
  order: IOrderDTO;
  closeMenu?: () => void;
}) => {
  const { order, closeMenu } = props;
  const translate = useTranslate();

  const { handleClick, disabled } = useBookmarkButton(order, closeMenu);

  const iconColor = disabled ? 'disabled' : 'action';

  const handleOpenBookmarkModal = () => {
    handleClick();
  };

  return (
    <ContextMenuItemShell
      IconComponent={<ItechSaveBookmarkIcon fontSize="small" color={iconColor} />}
      MenuItemProps={{ disabled: disabled, onClick: handleOpenBookmarkModal }}
      MainComponent={translate.bookmark.title()}
      hotkeyString={HOTKEYS.BOOKMARK.title}
    />
  );
};

import { Typography } from '@mui/material';
import React from 'react';

import { ItechDeleteIcon } from '@/assets/icon';
import { ContextMenuItemShell } from '@/components/Menu/ContextMenuItemShell';
import { HOTKEYS } from '@/config';
import { useTranslate } from '@/hooks';
import { useDeleteOrder } from '@/hooks/order/useDeleteOrder';
import { IOrderDTO } from '@/types/dto';

export const DeleteOrderMenuItem = ({
  order,
  closeMenu,
}: {
  order: IOrderDTO;
  closeMenu: () => void;
}) => {
  const translate = useTranslate();
  const { buttonIsActive, iconColor, handleDeleteOrder } = useDeleteOrder(
    order,
    closeMenu,
  );
  return (
    <ContextMenuItemShell
      MenuItemProps={{
        disabled: !buttonIsActive,
        onClick: () => handleDeleteOrder(),
      }}
      IconComponent={<ItechDeleteIcon fontSize="small" color={iconColor} />}
      MainComponent={<Typography>{translate.buttons.deleteOrder()}</Typography>}
      hotkeyString={HOTKEYS.ORDER_DELETE.title}
    />
  );
};

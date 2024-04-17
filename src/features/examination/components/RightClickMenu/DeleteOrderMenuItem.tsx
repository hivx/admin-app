import { Typography } from '@mui/material';
import React, { FC } from 'react';

import { ItechDeleteIcon } from '@/assets/icon';
import { ContextMenuItemShell } from '@/components/Menu/ContextMenuItemShell';
import { HOTKEYS } from '@/config';
import { useTranslate } from '@/hooks';
import { useDeleteOrder } from '@/hooks/order/useDeleteOrder';

import { ExaminationRightClickMenuItemProps } from './ExaminationRightClickMenu';

export const DeleteOrderMenuItem: FC<ExaminationRightClickMenuItemProps> = ({
  closeMenu,
  order,
}) => {
  const translate = useTranslate();
  const { buttonIsActive, handleDeleteOrder } = useDeleteOrder(order, closeMenu);
  return (
    <ContextMenuItemShell
      MenuItemProps={{
        disabled: !buttonIsActive,
        onClick: handleDeleteOrder,
      }}
      IconComponent={<ItechDeleteIcon fontSize="small" />}
      MainComponent={<Typography>{translate.buttons.deleteOrder()}</Typography>}
      hotkeyString={HOTKEYS.ORDER_DELETE.title}
    />
  );
};

import React from 'react';

import ItechDeleteLockIcon from '@/assets/icon/DeleteLockIcon';
import { ContextMenuItemShell } from '@/components/Menu/ContextMenuItemShell';
import { useTranslate } from '@/hooks';
import { IOrderDTO } from '@/types/dto';

import { useDeleteLockOrder } from '../../../../../hooks/lockOrder/useDeleteLockOrder';

export const DeleteLockOrderMenu = ({
  metadata,
  closeMenu,
}: {
  metadata: IOrderDTO;
  closeMenu: () => void;
}) => {
  const translate = useTranslate();
  const { deletable, deleteLockOrder } = useDeleteLockOrder(metadata.id);

  return (
    <ContextMenuItemShell
      IconComponent={<ItechDeleteLockIcon fontSize="small" color="inherit" />}
      MenuItemProps={{
        onClick: () => {
          closeMenu();
          deleteLockOrder();
        },
        disabled: !deletable,
      }}
      MainComponent={translate.pages.orderReport.actions.deleteLock()}
    />
  );
};

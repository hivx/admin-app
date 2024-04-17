import React from 'react';

import { ItechDeleteIcon } from '@/assets/icon';
import { ContextMenuItemShell } from '@/components/Menu/ContextMenuItemShell';
import { useTranslate } from '@/hooks';
import { useDeleteOrderFile } from '@/hooks/order/useOrderFile';
import { useUserPermission } from '@/providers/AuthProvider';
import { BaseEntity } from '@/types';
import { IOrderFileDTO } from '@/types/dto';

export const DeleteAttachmentMenuItem = (props: {
  orderID: BaseEntity['id'];
  closeMenu?: () => void;
  metaData: IOrderFileDTO;
}) => {
  const { orderID, closeMenu, metaData } = props;
  const translate = useTranslate();
  const userPermissions = useUserPermission();
  const { handleDeleteOneFile } = useDeleteOrderFile(orderID ?? 0);
  const disabled = !userPermissions?.userCanLockOrder;
  const handleDeleteFileUpload = () => {
    handleDeleteOneFile(metaData);
    closeMenu && closeMenu();
  };
  return (
    <>
      <ContextMenuItemShell
        MenuItemProps={{ onClick: handleDeleteFileUpload, disabled }}
        MainComponent={translate.buttons.deleteAttachment()}
        IconComponent={<ItechDeleteIcon fontSize="small" color="inherit" />}
      />
    </>
  );
};

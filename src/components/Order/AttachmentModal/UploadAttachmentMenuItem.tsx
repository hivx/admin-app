import React from 'react';

import { ItechUploadAttachmentIcon } from '@/assets/icon';
import { ContextMenuItemShell } from '@/components/Menu/ContextMenuItemShell';
import { useTranslate } from '@/hooks';
import { useUploadOrderFile } from '@/hooks/order/useOrderFile';
import { useUploadButton } from '@/hooks/order/useUploadButton';
import { useUserPermission } from '@/providers/AuthProvider';
import { BaseEntity } from '@/types';

export const UploadAttachmentMenuItem = (props: {
  orderID: BaseEntity['id'];
  closeMenu?: () => void;
}) => {
  const { orderID, closeMenu } = props;
  const translate = useTranslate();
  const userPermissions = useUserPermission();
  const { handleUploadFile } = useUploadOrderFile(orderID ?? 0);
  const disabled = !userPermissions?.userCanLockOrder;
  const { inputRef, handleClickUpload } = useUploadButton();
  const handleOpenFilesUpload = () => {
    handleClickUpload();
    closeMenu && closeMenu();
  };
  return (
    <>
      <ContextMenuItemShell
        MenuItemProps={{ onClick: handleOpenFilesUpload, disabled }}
        MainComponent={translate.buttons.uploadAttachment()}
        IconComponent={<ItechUploadAttachmentIcon fontSize="small" color="inherit" />}
      />
      <input hidden multiple type="file" onChange={handleUploadFile} ref={inputRef} />
    </>
  );
};

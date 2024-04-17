import React from 'react';

import { ItechDownloadIcon } from '@/assets/icon';
import { ContextMenuItemShell } from '@/components/Menu/ContextMenuItemShell';
import { useTranslate } from '@/hooks';
import { usePreviewAttachment } from '@/hooks/order/usePreviewAttachment';
import { useUserPermission } from '@/providers/AuthProvider';
import { IOrderFileDTO } from '@/types/dto';

export const DownloadAttachmentMenuItem = (props: {
  closeMenu?: () => void;
  metaData: IOrderFileDTO;
}) => {
  const { closeMenu, metaData } = props;
  const translate = useTranslate();
  const userPermissions = useUserPermission();
  const { handleDownloadFile } = usePreviewAttachment(metaData);
  const disabled = !userPermissions?.userCanLockOrder;
  const handleDownloadFileUploaded = () => {
    handleDownloadFile();
    closeMenu && closeMenu();
  };
  return (
    <>
      <ContextMenuItemShell
        MenuItemProps={{ onClick: handleDownloadFileUploaded, disabled }}
        MainComponent={translate.buttons.downloadAttachment()}
        IconComponent={<ItechDownloadIcon fontSize="small" color="inherit" />}
      />
    </>
  );
};

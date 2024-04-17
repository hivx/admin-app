import React, { FC } from 'react';

import { ItechUploadAttachmentIcon } from '@/assets/icon';
import { useUploadOrderFile } from '@/hooks/order/useOrderFile';
import { useUploadButton } from '@/hooks/order/useUploadButton';

import { AttachmentButtonProps } from '../../modals/attachmentModal/AttachmentActionButton';
import { MobileIconButton } from '../MobileIconButton';

/**
 * Nút tải lên tài liệu
 */
export const MobileUploadFileButton: FC<AttachmentButtonProps> = ({ orderID }) => {
  const { handleUploadFile } = useUploadOrderFile(orderID);
  const { inputRef, handleClickUpload } = useUploadButton();

  return (
    <>
      <MobileIconButton
        IconComponent={<ItechUploadAttachmentIcon />}
        onClick={handleClickUpload}
      />
      <input hidden multiple type="file" onChange={handleUploadFile} ref={inputRef} />
    </>
  );
};

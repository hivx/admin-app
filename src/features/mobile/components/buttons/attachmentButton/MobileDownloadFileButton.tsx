import React, { FC } from 'react';

import { ItechDownloadIcon } from '@/assets/icon';
import { usePreviewAttachment } from '@/hooks/order/usePreviewAttachment';
import { IOrderFileDTO } from '@/types/dto';

import { AttachmentButtonProps } from '../../modals/attachmentModal/AttachmentActionButton';
import { MobileIconButton } from '../MobileIconButton';
type MobileDownloadFileButtonProps = AttachmentButtonProps & {
  selectedFile: IOrderFileDTO;
};

/**
 * Nút tải xuống tài liệu
 */
export const MobileDownloadFileButton: FC<MobileDownloadFileButtonProps> = ({
  selectedFile,
}) => {
  const { handleDownloadFile } = usePreviewAttachment(selectedFile);

  return (
    <MobileIconButton
      IconComponent={<ItechDownloadIcon />}
      onClick={handleDownloadFile}
    />
  );
};

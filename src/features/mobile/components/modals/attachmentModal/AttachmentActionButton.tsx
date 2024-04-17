import { Stack } from '@mui/material';
import React, { FC } from 'react';

import { useAppSelector } from '@/hooks';
import { TABLE_ATTACHMENT } from '@/stores/table/tableInitialState';
import { getCurrentSelectedRow } from '@/stores/table/tableSelectors';
import { IOrderDTO, IOrderFileDTO } from '@/types/dto';

import { MobileDeleteFileButton } from '../../buttons/attachmentButton/MobileDeleteFileButton';
import { MobileDownloadFileButton } from '../../buttons/attachmentButton/MobileDownloadFileButton';
import { MobileUploadFileButton } from '../../buttons/attachmentButton/MobileUploadFileButton';

export type AttachmentButtonProps = {
  orderID: IOrderDTO['id'];
};

/**
 * Các icon button dùng trong Popup Tài liệu đính kèm
 */
export const AttachmentActionButton: FC<AttachmentButtonProps> = ({ orderID }) => {
  const selectedFile = useAppSelector(
    getCurrentSelectedRow<IOrderFileDTO>(TABLE_ATTACHMENT),
  );

  return (
    <Stack direction="row" spacing={1}>
      <MobileUploadFileButton orderID={orderID} />
      {selectedFile && (
        <>
          <MobileDownloadFileButton orderID={orderID} selectedFile={selectedFile} />{' '}
          <MobileDeleteFileButton orderID={orderID} />
        </>
      )}
    </Stack>
  );
};

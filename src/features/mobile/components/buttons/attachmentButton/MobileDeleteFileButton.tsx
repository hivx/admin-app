import { FC } from 'react';

import { ItechDeleteIcon } from '@/assets/icon';
import { useDeleteOrderFile } from '@/hooks/order/useOrderFile';

import { AttachmentButtonProps } from '../../modals/attachmentModal/AttachmentActionButton';
import { MobileIconButton } from '../MobileIconButton';

/**
 * Nút xóa tài liệu
 */
export const MobileDeleteFileButton: FC<AttachmentButtonProps> = ({ orderID }) => {
  const { handleDeleteFiles, isLoading: isLoadingDelete } = useDeleteOrderFile(orderID);

  return (
    <MobileIconButton IconComponent={<ItechDeleteIcon />} onClick={handleDeleteFiles} />
  );
};

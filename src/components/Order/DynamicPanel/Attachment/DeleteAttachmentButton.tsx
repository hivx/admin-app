import React, { FC } from 'react';

import { ItechDeleteIcon } from '@/assets/icon';
import { DynamicPanelHeaderButton } from '@/components/Layout/DynamicSidepanel/DynamicPanelHeaderButton';
import { useTranslate } from '@/hooks';
import { useDeleteOrderFile } from '@/hooks/order/useOrderFile';
import { IOrderDTO } from '@/types/dto';

type DeleteAttachmentButtonProps = {
  order?: IOrderDTO;
};

/**
 * Nút xóa file ở khung dynamic Tệp đính kém
 */
const DeleteAttachmentButton: FC<DeleteAttachmentButtonProps> = (props) => {
  const { order } = props;
  const translate = useTranslate();
  const disabled = !order;
  const { handleDeleteFiles } = useDeleteOrderFile(order?.id ?? 0);
  return (
    <>
      <DynamicPanelHeaderButton
        IconComponent={ItechDeleteIcon}
        title={translate.buttons.deleteAttachment()}
        disabled={disabled}
        onClick={handleDeleteFiles}
      />
    </>
  );
};

export default DeleteAttachmentButton;

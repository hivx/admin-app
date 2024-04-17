import React, { FC } from 'react';

import { ItechUploadAttachmentIcon } from '@/assets/icon';
import { DynamicPanelHeaderButton } from '@/components/Layout/DynamicSidepanel/DynamicPanelHeaderButton';
import { useTranslate } from '@/hooks';
import { useUploadOrderFile } from '@/hooks/order/useOrderFile';
import { useUploadButton } from '@/hooks/order/useUploadButton';
import { IOrderDTO } from '@/types/dto';

type UploadAttachmentButtonProps = {
  order?: IOrderDTO;
};

const UploadAttachmentButton: FC<UploadAttachmentButtonProps> = (props) => {
  const { order } = props;
  const translate = useTranslate();
  const disabled = !order;
  const { handleUploadFile } = useUploadOrderFile(order?.id ?? 0);
  const { inputRef, handleClickUpload } = useUploadButton();
  return (
    <>
      <DynamicPanelHeaderButton
        IconComponent={ItechUploadAttachmentIcon}
        title={translate.buttons.uploadAttachment()}
        disabled={disabled}
        onClick={handleClickUpload}
      />
      <input hidden multiple type="file" onChange={handleUploadFile} ref={inputRef} />
    </>
  );
};

export default UploadAttachmentButton;

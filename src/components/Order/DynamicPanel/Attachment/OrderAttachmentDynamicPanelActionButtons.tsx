import { FC } from 'react';

import { IOrderDTO } from '@/types/dto';

import DeleteAttachmentButton from './DeleteAttachmentButton';
import UploadAttachmentButton from './UploadAttachmentButton';

type OrderAttachmentDynamicPanelActionButtonsProps = {
  order?: IOrderDTO;
};
export const OrderAttachmentDynamicPanelActionButtons: FC<
  OrderAttachmentDynamicPanelActionButtonsProps
> = (props) => {
  const { order } = props;
  return (
    <>
      <UploadAttachmentButton order={order} />
      <DeleteAttachmentButton order={order} />
    </>
  );
};

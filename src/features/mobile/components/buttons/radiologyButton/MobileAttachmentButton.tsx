import React from 'react';

import ItechAttachmentIcon from '@/assets/icon/AttachmentIcon';
import { useDisclosure } from '@/hooks';
import { IOrderDTO } from '@/types/dto';

import { MobileFileAttachmentModal } from '../../modals/attachmentModal/MobileFileAttachmentModal';
import { MobileIconButton } from '../MobileIconButton';

/**
 * Nút để bật popup + popup Tệp đính kèm cho mobile
 */
export const MobileAttachmentButton = ({ order }: { order: IOrderDTO }) => {
  const disclosure = useDisclosure(false);

  return (
    <>
      <MobileIconButton
        IconComponent={<ItechAttachmentIcon />}
        onClick={disclosure.open}
      />

      {disclosure.isOpen && <MobileFileAttachmentModal {...disclosure} order={order} />}
    </>
  );
};

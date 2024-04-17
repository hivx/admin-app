import { Modal } from '@mui/material';
import React, { FC } from 'react';

import { ModalContent } from '@/components/Elements/Modal/ModalContent';
import { useDisclosure, useTranslate } from '@/hooks';
import { IOrderDTO } from '@/types/dto';

import { MobileLayout } from '../../layout/MobileLayout';
import { LayoutWithTopbarWrapper } from '../../topbar/LayoutWithTopbarWrapper';

import { AttachmentTableWrapper } from './AttachmentTableWrapper';

type MobileFileAttachmentModalProps = ReturnType<typeof useDisclosure> & {
  order: IOrderDTO;
};

export const MobileFileAttachmentModal: FC<MobileFileAttachmentModalProps> = ({
  close,
  isOpen,
  open,
  toggle,
  order,
}) => {
  const translate = useTranslate();
  return (
    <Modal disableEnforceFocus open={isOpen}>
      <ModalContent
        renderBody={() => (
          <MobileLayout title={translate.buttons.attachment()}>
            <LayoutWithTopbarWrapper
              onBackward={close}
              title={order?.patient?.fullname ?? ''}
              MainComponent={<AttachmentTableWrapper order={order} />}
            />
          </MobileLayout>
        )}
      />
    </Modal>
  );
};

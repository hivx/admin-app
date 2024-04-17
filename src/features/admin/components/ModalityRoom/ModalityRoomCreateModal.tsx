import { Modal } from '@mui/material';
import { FC, forwardRef } from 'react';

import {
  AppModalContent,
  ICommonAppModalProps,
} from '@/components/Elements/Modal/AppModalContent';
import { useDisclosure, useTranslate } from '@/hooks';
import {
  useAdminFunctions,
  useRegisterAdminFunctions,
} from '@/providers/Admin/AdminProvider';

import { ModalityRoomCreateForm } from './ModalityRoomCreateForm';

type ModalityRoomCreateModalProps = ICommonAppModalProps;

export const ConnectedModalityRoomCreateModal: FC = () => {
  const { isOpen, open, close } = useDisclosure(false);
  const register = useRegisterAdminFunctions();
  register('openCreateModal', open);

  return (
    <Modal open={isOpen}>
      <ModalityRoomCreateModal closeModal={close} />
    </Modal>
  );
};

export const ModalityRoomCreateModal = forwardRef<
  HTMLElement,
  ModalityRoomCreateModalProps
>((props) => {
  const { closeModal } = props;
  const translate = useTranslate();
  const adminFunctions = useAdminFunctions();

  return (
    <AppModalContent
      confirmLabel={translate.buttons.create()}
      handleClose={closeModal}
      BodyComponent={<ModalityRoomCreateForm onSuccessCallback={closeModal} />}
      handleConfirm={() => adminFunctions.submitCreateForm()}
      title={translate.messages.titles.createResource({
        resource: translate.resources.modalityRoom.title().toLowerCase(),
      })}
    />
  );
});

ModalityRoomCreateModal.displayName = 'ModalRoomCreateModal';

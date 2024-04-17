import { Modal } from '@mui/material';
import React from 'react';

import { AppModalContent } from '@/components/Elements/Modal/AppModalContent';
import { useDisclosure, useTranslate } from '@/hooks';
import {
  useAdminFunctions,
  useRegisterAdminFunctions,
} from '@/providers/Admin/AdminProvider';

import { ModalityTypeNameCreateForm } from './ModalityTypeNameCreateForm';

export type ModalityTypeNameCreateModalProps = { closeModal: () => void };

export const ConnectedModalityTypeNameCreateModal = () => {
  const { isOpen, open, close } = useDisclosure(false);
  const register = useRegisterAdminFunctions();
  register('openCreateModal', open);

  return (
    <Modal open={isOpen}>
      <ModalityTypeNameCreateModal closeModal={close} />
    </Modal>
  );
};

export const ModalityTypeNameCreateModal = (props: ModalityTypeNameCreateModalProps) => {
  const { closeModal } = props;
  const translate = useTranslate();
  const adminFunctions = useAdminFunctions();

  return (
    <AppModalContent
      confirmLabel={translate.buttons.create()}
      handleClose={closeModal}
      BodyComponent={<ModalityTypeNameCreateForm onSuccessCallback={closeModal} />}
      handleConfirm={() => adminFunctions.submitCreateForm()}
      title={translate.messages.titles.createResource({
        resource: translate.resources.modalityTypeName.title().toLowerCase(),
      })}
    />
  );
};

ModalityTypeNameCreateModal.displayName = 'ModalityTypeNameCreateModal';

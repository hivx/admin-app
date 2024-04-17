import { Modal } from '@mui/material';
import React, { FC, forwardRef } from 'react';

import {
  AppModalContent,
  ICommonAppModalProps,
} from '@/components/Elements/Modal/AppModalContent';
import { useDisclosure, useTranslate } from '@/hooks';
import {
  useAdminFunctions,
  useRegisterAdminFunctions,
} from '@/providers/Admin/AdminProvider';

import { ModalityTypeCreateForm } from './ModalityTypeCreateForm';

type ModalityTypeCreateModalProps = ICommonAppModalProps;

export const ConnectedModalityTypeCreateModal: FC = () => {
  const { isOpen, open, close } = useDisclosure(false);
  const register = useRegisterAdminFunctions();
  register('openCreateModal', open);

  return (
    <Modal open={isOpen}>
      <ModalityTypeCreateModal closeModal={close} />
    </Modal>
  );
};

export const ModalityTypeCreateModal = forwardRef<
  HTMLElement,
  ModalityTypeCreateModalProps
>((props, ref) => {
  const { closeModal } = props;
  const translate = useTranslate();
  const adminFunctions = useAdminFunctions();

  return (
    <AppModalContent
      ref={ref}
      confirmLabel={translate.buttons.create()}
      handleClose={closeModal}
      BodyComponent={<ModalityTypeCreateForm onSuccessCallback={closeModal} />}
      handleConfirm={() => adminFunctions.submitCreateForm()}
      title={translate.messages.titles.createResource({
        resource: translate.resources.modalityType.title().toLowerCase(),
      })}
    />
  );
});

ModalityTypeCreateModal.displayName = 'ModalityTypeCreateModal';

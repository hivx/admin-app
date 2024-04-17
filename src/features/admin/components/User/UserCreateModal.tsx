import { Modal } from '@mui/material';
import React from 'react';

import { AppModalContent } from '@/components/Elements/Modal/AppModalContent';
import { useDisclosure, useTranslate } from '@/hooks';
import {
  useAdminFunctions,
  useRegisterAdminFunctions,
} from '@/providers/Admin/AdminProvider';

import { UserCreateForm } from './UserCreateForm';

export type UserCreateModalProps = { closeModal: () => void };

export const ConnectedUserCreateModal = () => {
  const { isOpen, open, close } = useDisclosure(false);
  const register = useRegisterAdminFunctions();
  register('openCreateModal', open);

  return (
    <Modal open={isOpen}>
      <UserCreateModal closeModal={close} />
    </Modal>
  );
};

export const UserCreateModal = (props: UserCreateModalProps) => {
  const { closeModal } = props;
  const translate = useTranslate();
  const adminFunctions = useAdminFunctions();

  return (
    <AppModalContent
      confirmLabel={translate.buttons.create()}
      handleClose={closeModal}
      BodyComponent={<UserCreateForm onSuccessCallback={closeModal} />}
      handleConfirm={() => adminFunctions.submitCreateForm()}
      title={translate.messages.titles.createResource({
        resource: translate.resources.user.name().toLowerCase(),
      })}
      width="60%"
    />
  );
};

UserCreateModal.displayName = 'UserCreateModal';

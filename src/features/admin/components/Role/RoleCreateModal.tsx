import { Modal } from '@mui/material';
import React from 'react';

import { AppModalContent } from '@/components/Elements/Modal/AppModalContent';
import { useDisclosure, useTranslate } from '@/hooks';
import {
  useAdminFunctions,
  useRegisterAdminFunctions,
} from '@/providers/Admin/AdminProvider';

import { RoleCreateForm } from './RoleCreateForm';

export type RoleCreateModalProps = { closeModal: () => void };

export const ConnectedRoleCreateModal = () => {
  const { isOpen, open, close } = useDisclosure(false);
  const register = useRegisterAdminFunctions();
  register('openCreateModal', open);

  return (
    <Modal open={isOpen}>
      <RoleCreateModal closeModal={close} />
    </Modal>
  );
};

export const RoleCreateModal = (props: RoleCreateModalProps) => {
  const { closeModal } = props;
  const translate = useTranslate();
  const adminFunctions = useAdminFunctions();

  return (
    <AppModalContent
      confirmLabel={translate.buttons.create()}
      handleClose={closeModal}
      BodyComponent={<RoleCreateForm onSuccessCallback={closeModal} />}
      handleConfirm={() => adminFunctions.submitCreateForm()}
      title={translate.messages.titles.createResource({
        resource: translate.resources.role.title().toLowerCase(),
      })}
    />
  );
};

RoleCreateModal.displayName = 'RoleCreateModal';

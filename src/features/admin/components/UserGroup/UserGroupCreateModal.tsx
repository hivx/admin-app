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

import { UserGroupCreateForm } from './UserGroupCreateForm';

type UserGroupCreateModalProps = ICommonAppModalProps;

export const ConnectedUserGroupCreateModal: FC = () => {
  const { isOpen, open, close } = useDisclosure(false);
  const register = useRegisterAdminFunctions();
  register('openCreateModal', open);

  return (
    <Modal disableEnforceFocus open={isOpen}>
      <UserGroupCreateModal closeModal={close} />
    </Modal>
  );
};

export const UserGroupCreateModal = forwardRef<HTMLElement, UserGroupCreateModalProps>(
  (props, ref) => {
    const { closeModal } = props;
    const translate = useTranslate();
    const adminFunctions = useAdminFunctions();

    return (
      <AppModalContent
        ref={ref}
        confirmLabel={translate.buttons.create()}
        handleClose={closeModal}
        BodyComponent={<UserGroupCreateForm onSuccessCallback={closeModal} />}
        handleConfirm={() => adminFunctions.submitCreateForm()}
        title={translate.messages.titles.createResource({
          resource: translate.resources.group.title().toLowerCase(),
        })}
        width="40%"
      />
    );
  },
);

UserGroupCreateModal.displayName = 'UserGroupCreateModal';

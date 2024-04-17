import { Modal } from '@mui/material';
import { FC, forwardRef } from 'react';

import {
  AppModalContent,
  ICommonAppModalProps,
} from '@/components/Elements/Modal/AppModalContent';
import { useTranslate, useDisclosure } from '@/hooks';
import {
  useRegisterAdminFunctions,
  useAdminFunctions,
} from '@/providers/Admin/AdminProvider';

import { ApplicationCreateForm } from './ApplicationCreateForm';

type ApplicationCreateModalProps = ICommonAppModalProps;

export const ConnectedApplicationCreateModal: FC = () => {
  const { isOpen, open, close } = useDisclosure(false);
  const register = useRegisterAdminFunctions();
  register('openCreateModal', open);

  return (
    <Modal open={isOpen}>
      <ApplicationCreateModal closeModal={close} />
    </Modal>
  );
};

export const ApplicationCreateModal = forwardRef<
  HTMLElement,
  ApplicationCreateModalProps
>((props, ref) => {
  const { closeModal } = props;
  const translate = useTranslate();
  const adminFunctions = useAdminFunctions();

  return (
    <AppModalContent
      ref={ref}
      confirmLabel={translate.buttons.create()}
      handleClose={closeModal}
      BodyComponent={<ApplicationCreateForm onSuccessCallback={closeModal} />}
      handleConfirm={() => adminFunctions.submitCreateForm()}
      title={translate.messages.titles.createResource({
        resource: translate.resources.application.title.short().toLowerCase(),
      })}
    />
  );
});

ApplicationCreateModal.displayName = 'ApplicationCreateModal';

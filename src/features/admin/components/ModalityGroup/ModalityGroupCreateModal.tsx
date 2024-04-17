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

import { ModalityGroupCreateForm } from './ModalityGroupCreateForm';

type ModalityGroupCreateModalProps = ICommonAppModalProps;

export const ConnectedModalityGroupCreateModal: FC = () => {
  const { isOpen, open, close } = useDisclosure(false);
  const register = useRegisterAdminFunctions();
  register('openCreateModal', open);

  return (
    <Modal open={isOpen}>
      <ModalityGroupCreateModal closeModal={close} />
    </Modal>
  );
};

export const ModalityGroupCreateModal = forwardRef<
  HTMLElement,
  ModalityGroupCreateModalProps
>((props) => {
  const { closeModal } = props;
  const translate = useTranslate();
  const adminFunctions = useAdminFunctions();

  return (
    <AppModalContent
      confirmLabel={translate.buttons.create()}
      handleClose={closeModal}
      BodyComponent={<ModalityGroupCreateForm onSuccessCallback={closeModal} />}
      handleConfirm={() => adminFunctions.submitCreateForm()}
      title={translate.messages.titles.createResource({
        resource: translate.resources.modalityGroup.title().toLowerCase(),
      })}
    />
  );
});

ModalityGroupCreateModal.displayName = 'ModalGroupCreateModal';

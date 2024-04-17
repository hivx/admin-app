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

import { ModalityCreateForm } from './ModalityCreateForm';

type ModalityCreateModalProps = ICommonAppModalProps;

export const ConnectedModalityCreateModal: FC = () => {
  const { isOpen, open, close } = useDisclosure(false);
  const register = useRegisterAdminFunctions();
  register('openCreateModal', open);

  return (
    <Modal open={isOpen}>
      <ModalityCreateModal closeModal={close} />
    </Modal>
  );
};

export const ModalityCreateModal = forwardRef<HTMLElement, ModalityCreateModalProps>(
  (props, ref) => {
    const { closeModal } = props;
    const translate = useTranslate();
    const adminFunctions = useAdminFunctions();

    return (
      <AppModalContent
        ref={ref}
        confirmLabel={translate.buttons.create()}
        handleClose={closeModal}
        BodyComponent={<ModalityCreateForm onSuccessCallback={closeModal} />}
        handleConfirm={() => adminFunctions.submitCreateForm()}
        title={translate.messages.titles.createResource({
          resource: translate.resources.modality.title().toLowerCase(),
        })}
      />
    );
  },
);

ModalityCreateModal.displayName = 'ModalityCreateModal';

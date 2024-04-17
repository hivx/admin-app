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

import { ProcedureCreateForm } from './ProcedureCreateForm';

type ProcedureCreateModalProps = ICommonAppModalProps;

export const ConnectedProcedureCreateModal: FC = () => {
  const { isOpen, open, close } = useDisclosure(false);
  const register = useRegisterAdminFunctions();
  register('openCreateModal', open);

  return (
    <Modal open={isOpen}>
      <ProcedureCreateModal closeModal={close} />
    </Modal>
  );
};

export const ProcedureCreateModal = forwardRef<HTMLElement, ProcedureCreateModalProps>(
  (props) => {
    const { closeModal } = props;
    const translate = useTranslate();
    const adminFunctions = useAdminFunctions();

    return (
      <AppModalContent
        confirmLabel={translate.buttons.create()}
        handleClose={closeModal}
        BodyComponent={<ProcedureCreateForm onSuccessCallback={closeModal} />}
        handleConfirm={() => adminFunctions.submitCreateForm()}
        title={translate.messages.titles.createResource({
          resource: translate.resources.procedure.title().toLowerCase(),
        })}
      />
    );
  },
);

ProcedureCreateModal.displayName = 'ModalRoomCreateModal';

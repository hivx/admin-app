import { Modal } from '@mui/material';
import { FC } from 'react';

import {
  AppModalContent,
  ICommonAppModalProps,
} from '@/components/Elements/Modal/AppModalContent';
import { useDisclosure, useTranslate } from '@/hooks';
import {
  useAdminFunctions,
  useRegisterAdminFunctions,
} from '@/providers/Admin/AdminProvider';

import { ProcedureGroupCreateForm } from './ProcedureGroupCreateForm';

type ProcedureGroupCreateModalProps = ICommonAppModalProps;

export const ConnectedProcedureGroupCreateModal: FC = () => {
  const { isOpen, open, close } = useDisclosure(false);
  const register = useRegisterAdminFunctions();
  register('openCreateModal', open);

  return (
    <Modal open={isOpen}>
      <ProcedureGroupCreateModal closeModal={close} />
    </Modal>
  );
};

export const ProcedureGroupCreateModal = (props: ProcedureGroupCreateModalProps) => {
  const { closeModal } = props;
  const translate = useTranslate();
  const adminFunctions = useAdminFunctions();

  return (
    <AppModalContent
      confirmLabel={translate.buttons.create()}
      handleClose={closeModal}
      BodyComponent={<ProcedureGroupCreateForm onSuccessCallback={closeModal} />}
      handleConfirm={() => adminFunctions.submitCreateForm()}
      title={translate.messages.titles.createResource({
        resource: translate.resources.procedureGroup.title().toLowerCase(),
      })}
    />
  );
};

ProcedureGroupCreateModal.displayName = 'ProcedureGroupCreateModal';

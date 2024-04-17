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

import { DepartmentCreateForm } from './DepartmentCreateForm';

type DepartmentCreateModalProps = ICommonAppModalProps;

export const ConnectedDepartmentCreateModal: FC = () => {
  const { isOpen, open, close } = useDisclosure(false);
  const register = useRegisterAdminFunctions();
  register('openCreateModal', open);

  return (
    <Modal open={isOpen}>
      <DepartmentCreateModal closeModal={close} />
    </Modal>
  );
};

export const DepartmentCreateModal = forwardRef<HTMLElement, DepartmentCreateModalProps>(
  (props, ref) => {
    const { closeModal } = props;
    const translate = useTranslate();
    const adminFunctions = useAdminFunctions();

    return (
      <AppModalContent
        ref={ref}
        confirmLabel={translate.buttons.create()}
        handleClose={closeModal}
        BodyComponent={<DepartmentCreateForm onSuccessCallback={closeModal} />}
        handleConfirm={() => adminFunctions.submitCreateForm()}
        title={translate.messages.titles.createResource({
          resource: translate.resources.department.title().toLowerCase(),
        })}
      />
    );
  },
);

DepartmentCreateModal.displayName = 'DepartmentCreateModal';

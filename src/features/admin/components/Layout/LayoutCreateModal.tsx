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

import { LayoutCreateForm } from './LayoutCreateForm';

type LayoutCreateModalProps = ICommonAppModalProps;

export const ConnectedLayoutCreateModal: FC = () => {
  const { isOpen, open, close } = useDisclosure(false);
  const register = useRegisterAdminFunctions();
  register('openCreateModal', open);

  return (
    <Modal disableEnforceFocus open={isOpen}>
      <LayoutCreateModal closeModal={close} />
    </Modal>
  );
};

export const LayoutCreateModal = forwardRef<HTMLElement, LayoutCreateModalProps>(
  (props, ref) => {
    const { closeModal } = props;
    const translate = useTranslate();
    const adminFunctions = useAdminFunctions();

    return (
      <AppModalContent
        ref={ref}
        confirmLabel={translate.buttons.create()}
        handleClose={closeModal}
        BodyComponent={<LayoutCreateForm onSuccessCallback={closeModal} />}
        handleConfirm={() => adminFunctions.submitCreateForm()}
        title={translate.messages.titles.createResource({
          resource: translate.resources.layout.title.short().toLowerCase(),
        })}
        width="70%"
      />
    );
  },
);

LayoutCreateModal.displayName = 'LayoutCreateModal';

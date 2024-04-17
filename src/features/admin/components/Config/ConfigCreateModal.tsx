import { Modal } from '@mui/material';
import { FC, forwardRef } from 'react';

import {
  AppModalContent,
  ICommonAppModalProps,
} from '@/components/Elements/Modal/AppModalContent';
import { StyledDivCenterChildren } from '@/components/Layout/StyledDiv';
import { useDisclosure, useTranslate } from '@/hooks';
import {
  useAdminFunctions,
  useRegisterAdminFunctions,
} from '@/providers/Admin/AdminProvider';

import { ConfigCreateForm } from './ConfigCreateForm';

/**
 * Modal wrapper the form create PACS config
 */
export const ConnectedConfigCreateModal: FC = () => {
  const { isOpen, open, close } = useDisclosure(false);
  const register = useRegisterAdminFunctions();
  register('openCreateModal', open);

  return (
    <Modal disableEnforceFocus open={isOpen}>
      <ConfigCreateModal closeModal={close} />
    </Modal>
  );
};

export const ConfigCreateModal = forwardRef<HTMLElement, ICommonAppModalProps>(
  (props, ref) => {
    const { closeModal } = props;
    const translate = useTranslate();

    const adminFunctions = useAdminFunctions();

    return (
      <AppModalContent
        ref={ref}
        confirmLabel={translate.buttons.create()}
        handleClose={closeModal}
        BodyComponent={
          <StyledDivCenterChildren>
            <ConfigCreateForm onSuccessCallback={closeModal} />
          </StyledDivCenterChildren>
        }
        handleConfirm={() => adminFunctions.submitCreateForm()}
        title={translate.messages.titles.createResource({
          resource: translate.resources.config.title().toLowerCase(),
        })}
      />
    );
  },
);

ConfigCreateModal.displayName = 'ConfigCreateModal';

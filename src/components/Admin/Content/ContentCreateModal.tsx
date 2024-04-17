import { CircularProgress, Modal } from '@mui/material';
import { FC, forwardRef } from 'react';

import { useGetListModalityTypeQuery } from '@/api/modalityType';
import {
  AppModalContent,
  ICommonAppModalProps,
} from '@/components/Elements/Modal/AppModalContent';
import { StyledDivCenterChildren } from '@/components/Layout/StyledDiv';
import { useAppSelector, useDisclosure, useTranslate } from '@/hooks';
import {
  useAdminFunctions,
  useRegisterAdminFunctions,
} from '@/providers/Admin/AdminProvider';

import { ContentCreateForm } from './ContentCreateForm';

type ContentCreateModalProps = ICommonAppModalProps;

export const ConnectedContentCreateModal: FC = () => {
  const { isOpen, open, close } = useDisclosure(false);
  const register = useRegisterAdminFunctions();
  register('openCreateModal', open);

  return (
    <Modal disableEnforceFocus open={isOpen}>
      <ContentCreateModal closeModal={close} />
    </Modal>
  );
};

export const ContentCreateModal = forwardRef<HTMLElement, ContentCreateModalProps>(
  (props, ref) => {
    const { closeModal } = props;
    const translate = useTranslate();
    const { data } = useGetListModalityTypeQuery({
      filter: {},
    });
    const currentUserData = useAppSelector((state) => state.auth.user);

    const adminFunctions = useAdminFunctions();

    return (
      <AppModalContent
        ref={ref}
        confirmLabel={translate.buttons.create()}
        handleClose={closeModal}
        BodyComponent={
          data && currentUserData ? (
            <ContentCreateForm
              currentUserData={currentUserData}
              onSuccessCallback={closeModal}
            />
          ) : (
            <StyledDivCenterChildren>
              <CircularProgress />
            </StyledDivCenterChildren>
          )
        }
        handleConfirm={() => adminFunctions.submitCreateForm()}
        title={translate.messages.titles.createResource({
          resource: translate.resources.content.title().toLowerCase(),
        })}
        width="50%"
      />
    );
  },
);

ContentCreateModal.displayName = 'ContentCreateModal';

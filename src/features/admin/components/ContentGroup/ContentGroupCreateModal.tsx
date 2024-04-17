import { CircularProgress, Modal } from '@mui/material';
import { FC, forwardRef } from 'react';

import { useGetListModalityTypeQuery } from '@/api/modalityType';
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

import { ContentGroupCreateForm } from './ContentGroupCreateForm';

type ContentGroupCreateModalProps = ICommonAppModalProps;

export const ConnectedContentGroupCreateModal: FC = () => {
  const { isOpen, open, close } = useDisclosure(false);
  const register = useRegisterAdminFunctions();
  register('openCreateModal', open);

  return (
    <Modal open={isOpen}>
      <ContentGroupCreateModal closeModal={close} />
    </Modal>
  );
};

export const ContentGroupCreateModal = forwardRef<
  HTMLElement,
  ContentGroupCreateModalProps
>((props, ref) => {
  const { closeModal } = props;
  const translate = useTranslate();
  const { data } = useGetListModalityTypeQuery({
    filter: {},
  });
  const adminFunctions = useAdminFunctions();

  return (
    <AppModalContent
      ref={ref}
      confirmLabel={translate.buttons.create()}
      handleClose={closeModal}
      BodyComponent={
        data ? (
          <ContentGroupCreateForm
            onSuccessCallback={closeModal}
            modalityTypes={data.list}
          />
        ) : (
          <StyledDivCenterChildren>
            <CircularProgress />
          </StyledDivCenterChildren>
        )
      }
      handleConfirm={() => adminFunctions.submitCreateForm()}
      title={translate.messages.titles.createResource({
        resource: translate.resources.contentGroup.title().toLowerCase(),
      })}
    />
  );
});

ContentGroupCreateModal.displayName = 'ContentGroupCreateModal';

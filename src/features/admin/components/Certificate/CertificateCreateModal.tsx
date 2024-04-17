import { CircularProgress, Modal } from '@mui/material';
import { FC, forwardRef } from 'react';

import {
  AppModalContent,
  ICommonAppModalProps,
} from '@/components/Elements/Modal/AppModalContent';
import { StyledDivCenterChildren } from '@/components/Layout/StyledDiv';
import { useTranslate, useDisclosure } from '@/hooks';
import {
  useRegisterAdminFunctions,
  useAdminFunctions,
} from '@/providers/Admin/AdminProvider';

import { useGetListCertificateQuery } from '../../api/certificate';
import { StyledAdminAppModalContentWrapper } from '../StyledAdminModalContent.styles';

import { CertificateCreateForm } from './CertificateCreateForm';

type CertificateCreateModalProps = ICommonAppModalProps;

export const ConnectedCertificateCreateModal: FC = () => {
  const { isOpen, open, close } = useDisclosure(false);
  const register = useRegisterAdminFunctions();
  register('openCreateModal', open);

  return (
    <Modal open={isOpen}>
      <CertificateCreateModal closeModal={close} />
    </Modal>
  );
};

export const CertificateCreateModal = forwardRef<
  HTMLElement,
  CertificateCreateModalProps
>((props, ref) => {
  const { closeModal } = props;
  const translate = useTranslate();
  const adminFunctions = useAdminFunctions();
  const { data } = useGetListCertificateQuery({
    filter: {},
  });
  return (
    <StyledAdminAppModalContentWrapper>
      <AppModalContent
        ref={ref}
        confirmLabel={translate.buttons.create()}
        handleClose={closeModal}
        BodyComponent={
          data ? (
            <CertificateCreateForm
              onSuccessCallback={closeModal}
              certificateList={data.list}
            />
          ) : (
            <StyledDivCenterChildren>
              <CircularProgress />
            </StyledDivCenterChildren>
          )
        }
        handleConfirm={() => adminFunctions.submitCreateForm()}
        title={translate.messages.titles.createResource({
          resource: translate.resources.certificate.title().toLowerCase(),
        })}
      />
    </StyledAdminAppModalContentWrapper>
  );
});

CertificateCreateModal.displayName = 'CertificateCreateModal';

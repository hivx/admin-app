import { CircularProgress, Modal } from '@mui/material';
import { FC, forwardRef, useCallback } from 'react';

import {
  AppModalContent,
  ICommonAppModalProps,
} from '@/components/Elements/Modal/AppModalContent';
import { StyledDivCenterChildren } from '@/components/Layout/StyledDiv';
import { useTranslate, useDisclosure, useAppSelector } from '@/hooks';
import {
  useRegisterAdminFunctions,
  useAdminFunctions,
} from '@/providers/Admin/AdminProvider';
import {
  useNotifyModal,
  useGenericNotifySnackbar,
} from '@/providers/NotificationProvider';
import { getCurrentSelectedRow } from '@/stores/table/tableSelectors';
import { ICertificateDTO } from '@/types/dto';
import { RESOURCES } from '@/types/resources';

import {
  useDeleteCertificateMutation,
  useGetListCertificateQuery,
  useGetOneCertificateQuery,
} from '../../api/certificate';
import { StyledAdminAppModalContentWrapper } from '../StyledAdminModalContent.styles';

import { CertificateEditForm } from './CertificateEditForm';

type CertificateEditModalProps = {
  record: ICertificateDTO;
} & ICommonAppModalProps;

export const ConnectedCertificateEditModal: FC = () => {
  const record = useAppSelector(
    getCurrentSelectedRow<ICertificateDTO>(RESOURCES.CERTIFICATE),
  );
  const { isOpen, open, close } = useDisclosure(false);
  const translate = useTranslate();
  const [deleteCertificate] = useDeleteCertificateMutation();
  const register = useRegisterAdminFunctions();
  const notifyModal = useNotifyModal();
  register('openEditModal', open);

  const notifySuccess = useGenericNotifySnackbar(
    'success',
    translate.messages.titles.deleteResource({
      resource: translate.resources.certificate.title().toLowerCase(),
    }),
  );

  const notifyError = useGenericNotifySnackbar(
    'error',
    translate.messages.titles.deleteResource({
      resource: translate.resources.certificate.title().toLowerCase(),
    }),
  );

  const handleDeleteCetificate = useCallback(() => {
    notifyModal({
      message: `${translate.messages.notification.delete({
        name: `${record?.account}`,
      })}`,
      options: {
        variant: 'warning',
        onConfirm: () => {
          const res = deleteCertificate({ id: record?.id as number });
          if ('error' in res) {
            notifyError();
          } else {
            notifySuccess();
            close();
          }
        },
      },
    });
  }, [
    close,
    deleteCertificate,
    notifyError,
    notifyModal,
    notifySuccess,
    record?.account,
    record?.id,
    translate.messages.notification,
  ]);

  register('submitDelete', () => handleDeleteCetificate());
  return record ? (
    <Modal open={isOpen}>
      <CertificateEditModal record={record} closeModal={close} />
    </Modal>
  ) : (
    <></>
  );
};

export const CertificateEditModal = forwardRef<HTMLElement, CertificateEditModalProps>(
  (props, ref) => {
    const { closeModal, record } = props;

    const notifyModal = useNotifyModal();
    const translate = useTranslate();
    const adminFunctions = useAdminFunctions();
    const { data: certificateListData } = useGetListCertificateQuery({
      filter: {},
    });
    const { data: certificate } = useGetOneCertificateQuery({ id: record.id });
    return (
      <StyledAdminAppModalContentWrapper>
        <AppModalContent
          ref={ref}
          confirmLabel={translate.buttons.update()}
          handleClose={closeModal}
          BodyComponent={
            certificate && certificateListData ? (
              <CertificateEditForm
                record={certificate}
                certificateList={certificateListData.list}
                onSuccessCallback={closeModal}
              />
            ) : (
              <StyledDivCenterChildren>
                <CircularProgress />
              </StyledDivCenterChildren>
            )
          }
          handleConfirm={() => adminFunctions.submitEditForm()}
          deleteLabel={translate.buttons.delete()}
          title={translate.messages.titles.editResource({
            resource: translate.resources.certificate.title().toLowerCase(),
          })}
        />
      </StyledAdminAppModalContentWrapper>
    );
  },
);

CertificateEditModal.displayName = 'CertificateEditModal';

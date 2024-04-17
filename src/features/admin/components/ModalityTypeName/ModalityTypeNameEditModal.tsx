import { CircularProgress, Modal } from '@mui/material';
import { skipToken } from '@reduxjs/toolkit/dist/query';
import { FC, forwardRef, useCallback } from 'react';

import {
  useDeleteModalityTypeNameMutation,
  useGetOneModalityTypeNameQuery,
} from '@/api/modalityTypeName';
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
import {
  useGenericNotifySnackbar,
  useNotifyModal,
} from '@/providers/NotificationProvider';
import { getCurrentSelectedRow } from '@/stores/table/tableSelectors';
import { IModalityTypeNameDTO } from '@/types/dto';
import { RESOURCES } from '@/types/resources';

import { ModalityTypeNameEditForm } from './ModalityTypeNameEditForm';

type ModalityTypeNameEditModalProps = {
  record: IModalityTypeNameDTO;
} & ICommonAppModalProps;

export const ConnectedModalityTypeNameEditModal: FC = () => {
  const { isOpen, open, close } = useDisclosure(false);
  const record = useAppSelector(
    getCurrentSelectedRow<IModalityTypeNameDTO>(RESOURCES.MODALITY_TYPE_NAME),
  );
  const { data: modalityTypeName } = useGetOneModalityTypeNameQuery(
    record ? { id: record?.id } : skipToken,
  );

  const [deleteModalityTypeName] = useDeleteModalityTypeNameMutation();
  const translate = useTranslate();
  const notifyModal = useNotifyModal();
  const register = useRegisterAdminFunctions();
  register('openEditModal', open);

  const notifySuccess = useGenericNotifySnackbar(
    'success',
    translate.messages.titles.deleteResource({
      resource: translate.resources.modalityTypeName.title().toLowerCase(),
    }),
  );

  const notifyError = useGenericNotifySnackbar(
    'error',
    translate.messages.titles.deleteResource({
      resource: translate.resources.modalityTypeName.title().toLowerCase(),
    }),
  );

  const handleDeleteModalityTypeName = useCallback(() => {
    modalityTypeName &&
      notifyModal({
        message: `${translate.messages.notification.deleteModalityTypeName({
          name: `${modalityTypeName?.name}`,
        })}`,
        options: {
          variant: 'warning',
          onConfirm: async () => {
            const res = await deleteModalityTypeName({ id: modalityTypeName.id });
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
    deleteModalityTypeName,
    modalityTypeName,
    notifyError,
    notifyModal,
    notifySuccess,
    translate.messages.notification,
  ]);

  register('submitDelete', () => handleDeleteModalityTypeName());

  return modalityTypeName ? (
    <Modal disableEnforceFocus open={isOpen}>
      <ModalityTypeNameEditModal record={modalityTypeName} closeModal={close} />
    </Modal>
  ) : (
    <></>
  );
};

export const ModalityTypeNameEditModal = forwardRef<
  HTMLElement,
  ModalityTypeNameEditModalProps
>((props, ref) => {
  const { closeModal, record } = props;
  const translate = useTranslate();
  const adminFunctions = useAdminFunctions();

  return (
    <>
      <AppModalContent
        ref={ref}
        confirmLabel={translate.buttons.update()}
        handleConfirm={() => adminFunctions.submitEditForm()}
        handleClose={closeModal}
        BodyComponent={
          record ? (
            <ModalityTypeNameEditForm record={record} onSuccessCallback={closeModal} />
          ) : (
            <StyledDivCenterChildren>
              <CircularProgress />
            </StyledDivCenterChildren>
          )
        }
        title={translate.messages.titles.editResource({
          resource: translate.resources.modalityTypeName.title().toLowerCase(),
        })}
      />
    </>
  );
});

ModalityTypeNameEditModal.displayName = 'ModalityTypeNameEditModal';

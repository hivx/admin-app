import { Modal } from '@mui/material';
import React, { FC, forwardRef, useCallback } from 'react';

import {
  useDeleteModalityTypeMutation,
  useGetOneModalityTypeQuery,
} from '@/api/modalityType';
import {
  AppModalContent,
  ICommonAppModalProps,
} from '@/components/Elements/Modal/AppModalContent';
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
import { IModalityTypeDTO } from '@/types/dto';
import { RESOURCES } from '@/types/resources';

import { ModalityTypeEditForm } from './ModalityTypeEditForm';

type ModalityTypeEditModalProps = {
  record: IModalityTypeDTO;
} & ICommonAppModalProps;

/**
 * check allow delete ModalityType
 * return 'false' if there is 'modality' in 'modalityType',else return 'true'
 */
// export const checkAllowDeleteModalityType = (record: IModalityTypeDTO) => {
//   return !record.modality;
// };
export const ConnectedModalityTypeEditModal: FC = () => {
  const translate = useTranslate();
  const { isOpen, open, close } = useDisclosure(false);
  const [deleteModalityType] = useDeleteModalityTypeMutation();
  const notifyModal = useNotifyModal();

  const record = useAppSelector(
    getCurrentSelectedRow<IModalityTypeDTO>(RESOURCES.MODALITY_TYPE),
  );
  const register = useRegisterAdminFunctions();
  register('openEditModal', open);
  const notifySuccess = useGenericNotifySnackbar(
    'success',
    translate.messages.titles.deleteResource({
      resource: translate.resources.modalityType.title().toLowerCase(),
    }),
  );

  const notifyError = useGenericNotifySnackbar(
    'error',
    translate.messages.titles.deleteResource({
      resource: translate.resources.modalityType.title().toLowerCase(),
    }),
  );

  const handleDeleteCetificate = useCallback(() => {
    notifyModal({
      message: `${translate.messages.notification.delete({
        name: `${record?.name}`,
      })}`,
      options: {
        variant: 'warning',
        onConfirm: () => {
          const res = deleteModalityType({ id: record?.id as number });
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
    deleteModalityType,
    notifyError,
    notifyModal,
    notifySuccess,
    record?.id,
    record?.name,
    translate.messages.notification,
  ]);

  register('submitDelete', () => handleDeleteCetificate());

  return record ? (
    <Modal open={isOpen}>
      <ModalityTypeEditModal record={record} closeModal={close} />
    </Modal>
  ) : (
    <></>
  );
};

export const ModalityTypeEditModal = forwardRef<HTMLElement, ModalityTypeEditModalProps>(
  (props, ref) => {
    const { closeModal, record } = props;
    const translate = useTranslate();
    const adminFunctions = useAdminFunctions();
    const { data: modalityType } = useGetOneModalityTypeQuery({ id: record.id });

    return (
      <AppModalContent
        ref={ref}
        confirmLabel={translate.buttons.update()}
        handleClose={closeModal}
        BodyComponent={
          modalityType && (
            <ModalityTypeEditForm record={modalityType} onSuccessCallback={closeModal} />
          )
        }
        handleConfirm={() => adminFunctions.submitEditForm()}
        title={translate.messages.titles.editResource({
          resource: translate.resources.modalityType.title().toLowerCase(),
        })}
      />
    );
  },
);

ModalityTypeEditModal.displayName = 'ModalityTypeEditModal';

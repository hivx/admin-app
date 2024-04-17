import { CircularProgress, Modal } from '@mui/material';
import { FC, forwardRef, useCallback } from 'react';

import { useDeleteModalityMutation, useGetOneModalityQuery } from '@/api/modality';
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
import { IModalityDTO } from '@/types/dto';
import { RESOURCES } from '@/types/resources';

import { ModalityEditForm } from './ModalityEditForm';

type ModalityEditModalProps = {
  record: IModalityDTO;
} & ICommonAppModalProps;

export const ConnectedModalityEditModal: FC = () => {
  const { isOpen, open, close } = useDisclosure(false);
  const translate = useTranslate();
  const notifyModal = useNotifyModal();
  const record = useAppSelector(getCurrentSelectedRow<IModalityDTO>(RESOURCES.MODALITY));
  const [deleteModality] = useDeleteModalityMutation();
  const register = useRegisterAdminFunctions();
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

  const handleDeleteModality = useCallback(() => {
    record &&
      notifyModal({
        message: `${translate.messages.notification.delete({
          name: `${record.name}`,
        })}`,
        options: {
          variant: 'warning',
          onConfirm: () => {
            const res = deleteModality({ id: record.id });
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
    deleteModality,
    notifyError,
    notifyModal,
    notifySuccess,
    record,
    translate.messages.notification,
  ]);

  register('submitDelete', () => handleDeleteModality());

  return record ? (
    <Modal open={isOpen}>
      <ModalityEditModal record={record} closeModal={close} />
    </Modal>
  ) : (
    <></>
  );
};
const ModalityEditModal = forwardRef<HTMLElement, ModalityEditModalProps>(
  (props, ref) => {
    const { closeModal, record } = props;
    const translate = useTranslate();
    const adminFunctions = useAdminFunctions();

    const { data: modality } = useGetOneModalityQuery({ id: record.id });

    return (
      <AppModalContent
        ref={ref}
        confirmLabel={translate.buttons.update()}
        handleConfirm={() => adminFunctions.submitEditForm()}
        handleClose={closeModal}
        BodyComponent={
          modality ? (
            <ModalityEditForm
              key={modality.id}
              record={modality}
              onSuccessCallback={closeModal}
            />
          ) : (
            <StyledDivCenterChildren>
              <CircularProgress />
            </StyledDivCenterChildren>
          )
        }
        title={translate.messages.titles.editResource({
          resource: translate.resources.modality.title().toLowerCase(),
        })}
      />
    );
  },
);

ModalityEditModal.displayName = 'ModalityEditModal';

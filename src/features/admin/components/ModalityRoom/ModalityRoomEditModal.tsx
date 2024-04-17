import { CircularProgress, Modal } from '@mui/material';
import { FC, forwardRef, useCallback } from 'react';

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
import { IModalityRoomDTO } from '@/types/dto';
import { RESOURCES } from '@/types/resources';

import {
  useDeleteModalityRoomMutation,
  useGetOneModalityRoomQuery,
} from '../../api/modalityRoom';

import { ModalityRoomEditForm } from './ModalityRoomEditForm';

type ModalityRoomEditModalProps = {
  record: IModalityRoomDTO;
} & ICommonAppModalProps;

export const ConnectedModalityRoomEditModal: FC = () => {
  const { isOpen, open, close } = useDisclosure(false);

  const record = useAppSelector(
    getCurrentSelectedRow<IModalityRoomDTO>(RESOURCES.MODALITY_ROOM),
  );
  const register = useRegisterAdminFunctions();
  register('openEditModal', open);
  const translate = useTranslate();
  const notifyModal = useNotifyModal();
  const [deleteModalityRoom] = useDeleteModalityRoomMutation();

  const notifySuccess = useGenericNotifySnackbar(
    'success',
    translate.messages.titles.deleteResource({
      resource: translate.resources.modalityRoom.title().toLowerCase(),
    }),
  );

  const notifyError = useGenericNotifySnackbar(
    'error',
    translate.messages.titles.deleteResource({
      resource: translate.resources.modalityRoom.title().toLowerCase(),
    }),
  );

  const handleDeleteModalityRoom = useCallback(() => {
    notifyModal({
      message: `${translate.messages.notification.delete({
        name: `${record?.name}`,
      })}`,
      options: {
        variant: 'warning',
        onConfirm: () => {
          const res = deleteModalityRoom({ id: record?.id as number });
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
    deleteModalityRoom,
    notifyError,
    notifyModal,
    notifySuccess,
    record?.id,
    record?.name,
    translate.messages.notification,
  ]);

  register('submitDelete', () => handleDeleteModalityRoom());
  return record ? (
    <Modal open={isOpen}>
      <ModalityRoomEditModal record={record} closeModal={close} />
    </Modal>
  ) : (
    <></>
  );
};
export const ModalityRoomEditModal = forwardRef<HTMLElement, ModalityRoomEditModalProps>(
  (props, ref) => {
    const { closeModal, record } = props;
    const translate = useTranslate();
    const notifyModal = useNotifyModal();
    const adminFunctions = useAdminFunctions();
    const { data: modalityRoom } = useGetOneModalityRoomQuery({ id: record.id });

    return (
      <AppModalContent
        ref={ref}
        confirmLabel={translate.buttons.update()}
        handleConfirm={() => adminFunctions.submitEditForm()}
        handleClose={closeModal}
        BodyComponent={
          modalityRoom ? (
            <ModalityRoomEditForm record={modalityRoom} onSuccessCallback={closeModal} />
          ) : (
            <StyledDivCenterChildren>
              <CircularProgress />
            </StyledDivCenterChildren>
          )
        }
        title={translate.messages.titles.editResource({
          resource: translate.resources.modalityRoom.title().toLowerCase(),
        })}
      />
    );
  },
);

ModalityRoomEditModal.displayName = 'ModalityRoomEditModal';

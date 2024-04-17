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
import { IModalityGroupDTO } from '@/types/dto';
import { RESOURCES } from '@/types/resources';

import {
  useDeleteModalityGroupMutation,
  useGetOneModalityGroupQuery,
} from '../../../../api/modalityGroup';

import { ModalityGroupEditForm } from './ModalityGroupEditForm';

type ModalityGroupEditModalProps = {
  record: IModalityGroupDTO;
} & ICommonAppModalProps;

export const ConnectedModalityGroupEditModal: FC = () => {
  const { isOpen, open, close } = useDisclosure(false);

  const record = useAppSelector(
    getCurrentSelectedRow<IModalityGroupDTO>(RESOURCES.MODALITY_GROUP),
  );
  const register = useRegisterAdminFunctions();
  register('openEditModal', open);
  const notifyModal = useNotifyModal();
  const translate = useTranslate();
  const [deletModalityGroup] = useDeleteModalityGroupMutation();

  const notifySuccess = useGenericNotifySnackbar(
    'success',
    translate.messages.titles.deleteResource({
      resource: translate.resources.modalityGroup.title().toLowerCase(),
    }),
  );

  const notifyError = useGenericNotifySnackbar(
    'error',
    translate.messages.titles.deleteResource({
      resource: translate.resources.modalityGroup.title().toLowerCase(),
    }),
  );

  const handleDeleteCetificate = useCallback(() => {
    notifyModal({
      message: `${translate.messages.notification.delete({
        name: `${record?.code}`,
      })}`,
      options: {
        variant: 'warning',
        onConfirm: () => {
          const res = deletModalityGroup({ id: record?.id as number });
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
    deletModalityGroup,
    notifyError,
    notifyModal,
    notifySuccess,
    record?.code,
    record?.id,
    translate.messages.notification,
  ]);

  register('submitDelete', () => handleDeleteCetificate());

  return record ? (
    <Modal open={isOpen}>
      <ModalityGroupEditModal record={record} closeModal={close} />
    </Modal>
  ) : (
    <></>
  );
};
export const ModalityGroupEditModal = forwardRef<
  HTMLElement,
  ModalityGroupEditModalProps
>((props, ref) => {
  const { closeModal, record } = props;
  const translate = useTranslate();
  const notifyModal = useNotifyModal();
  const adminFunctions = useAdminFunctions();
  const { data: modalityGroup } = useGetOneModalityGroupQuery({ id: record.id });

  return (
    <AppModalContent
      ref={ref}
      confirmLabel={translate.buttons.update()}
      handleConfirm={() => adminFunctions.submitEditForm()}
      handleClose={closeModal}
      BodyComponent={
        modalityGroup ? (
          <ModalityGroupEditForm record={modalityGroup} onSuccessCallback={closeModal} />
        ) : (
          <StyledDivCenterChildren>
            <CircularProgress />
          </StyledDivCenterChildren>
        )
      }
      title={translate.messages.titles.editResource({
        resource: translate.resources.modalityGroup.title().toLowerCase(),
      })}
    />
  );
});

ModalityGroupEditModal.displayName = 'ModalityGroupEditModal';

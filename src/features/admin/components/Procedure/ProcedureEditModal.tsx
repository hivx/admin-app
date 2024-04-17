import { CircularProgress, Modal } from '@mui/material';
import { FC, forwardRef, useCallback } from 'react';

import { useDeleteProcedureMutation, useGetOneProcedureQuery } from '@/api/procedure';
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
import { IProcedureDTO } from '@/types/dto';
import { RESOURCES } from '@/types/resources';

import { ProcedureEditForm } from './ProcedureEditForm';

type ProcedureEditModalProps = {
  record: IProcedureDTO;
} & ICommonAppModalProps;

export const ConnectedProcedureEditModal: FC = () => {
  const { isOpen, open, close } = useDisclosure(false);

  const record = useAppSelector(
    getCurrentSelectedRow<IProcedureDTO>(RESOURCES.PROCEDURE),
  );
  const register = useRegisterAdminFunctions();
  register('openEditModal', open);
  const translate = useTranslate();
  const [deleteProcedure] = useDeleteProcedureMutation();
  const notifyModal = useNotifyModal();

  const notifySuccess = useGenericNotifySnackbar(
    'success',
    translate.messages.titles.deleteResource({
      resource: translate.resources.procedure.title().toLowerCase(),
    }),
  );

  const notifyError = useGenericNotifySnackbar(
    'error',
    translate.messages.titles.deleteResource({
      resource: translate.resources.procedure.title().toLowerCase(),
    }),
  );

  const handleDeleteProcedure = useCallback(() => {
    record &&
      notifyModal({
        message: `${translate.messages.notification.delete({
          name: `${record.code}`,
        })}`,
        options: {
          variant: 'warning',
          onConfirm: () => {
            const res = deleteProcedure({ id: record.id });
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
    deleteProcedure,
    notifyError,
    notifyModal,
    notifySuccess,
    record,
    translate.messages.notification,
  ]);

  register('submitDelete', () => handleDeleteProcedure());
  return record ? (
    <Modal open={isOpen}>
      <ProcedureEditModal record={record} closeModal={close} />
    </Modal>
  ) : (
    <></>
  );
};
export const ProcedureEditModal = forwardRef<HTMLElement, ProcedureEditModalProps>(
  (props, ref) => {
    const { closeModal, record } = props;
    const translate = useTranslate();
    const notifyModal = useNotifyModal();
    const adminFunctions = useAdminFunctions();
    const { data: procedureData } = useGetOneProcedureQuery({ id: record.id });

    return (
      <AppModalContent
        ref={ref}
        confirmLabel={translate.buttons.update()}
        handleConfirm={() => adminFunctions.submitEditForm()}
        handleClose={closeModal}
        BodyComponent={
          procedureData ? (
            <ProcedureEditForm record={procedureData} onSuccessCallback={closeModal} />
          ) : (
            <StyledDivCenterChildren>
              <CircularProgress />
            </StyledDivCenterChildren>
          )
        }
        title={translate.messages.titles.editResource({
          resource: translate.resources.procedure.title().toLowerCase(),
        })}
      />
    );
  },
);

ProcedureEditModal.displayName = 'ProcedureEditModal';

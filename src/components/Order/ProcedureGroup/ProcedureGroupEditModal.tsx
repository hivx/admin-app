import { Modal } from '@mui/material';
import { FC, forwardRef, useCallback } from 'react';

import { useGetListProcedureQuery } from '@/api/procedure';
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
import { IProcedureGroupDTO } from '@/types/dto';
import { RESOURCES } from '@/types/resources';

import {
  useDeleteProcedureGroupMutation,
  useGetOneProcedureGroupQuery,
} from '../../../features/admin/api/procedureGroup';

import { ProcedureGroupEditForm } from './ProcedureGroupEditForm';

type ProcedureGroupEditModalProps = {
  record: IProcedureGroupDTO;
} & ICommonAppModalProps;

export const ConnectedProcedureGroupEditModal: FC = () => {
  const { isOpen, open, close } = useDisclosure(false);
  const notifyModal = useNotifyModal();

  const record = useAppSelector(
    getCurrentSelectedRow<IProcedureGroupDTO>(RESOURCES.PROCEDURE_GROUP),
  );
  const translate = useTranslate();
  const [deleteProcedureGroup] = useDeleteProcedureGroupMutation();

  const register = useRegisterAdminFunctions();
  register('openEditModal', open);

  const notifySuccess = useGenericNotifySnackbar(
    'success',
    translate.messages.titles.deleteResource({
      resource: translate.resources.procedureGroup.title().toLowerCase(),
    }),
  );

  const notifyError = useGenericNotifySnackbar(
    'error',
    translate.messages.titles.deleteResource({
      resource: translate.resources.procedureGroup.title().toLowerCase(),
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
          const res = deleteProcedureGroup({ id: record?.id as number });
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
    deleteProcedureGroup,
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
      <ProcedureGroupEditModal key={record.id} record={record} closeModal={close} />
    </Modal>
  ) : (
    <></>
  );
};
export const ProcedureGroupEditModal = forwardRef<
  HTMLElement,
  ProcedureGroupEditModalProps
>((props, ref) => {
  const { closeModal, record } = props;
  const translate = useTranslate();
  const adminFunctions = useAdminFunctions();
  const { data: procedureGroup, isFetching: procedureGroupFetching } =
    useGetOneProcedureGroupQuery({ id: record.id });

  const proceduresIDs = procedureGroup?.procedures?.map((procedure) => procedure.id);

  const { data: procedureSelectData, isFetching: listProcedureFetching } =
    useGetListProcedureQuery(
      {
        filter: { ids: proceduresIDs || undefined },
      },
      { skip: !proceduresIDs },
    );

  return (
    <AppModalContent
      ref={ref}
      confirmLabel={translate.buttons.update()}
      handleConfirm={() => adminFunctions.submitEditForm()}
      handleClose={closeModal}
      isLoading={procedureGroupFetching || listProcedureFetching}
      BodyComponent={
        procedureGroup &&
        !procedureGroupFetching &&
        !listProcedureFetching && (
          <ProcedureGroupEditForm
            record={procedureGroup}
            key={procedureGroup.id}
            procedureSelected={
              procedureSelectData && procedureSelectData.list.length !== 0
                ? procedureSelectData.list
                : []
            }
            onSuccessCallback={closeModal}
          />
        )
      }
      title={translate.messages.titles.editResource({
        resource: translate.resources.procedureGroup.title().toLowerCase(),
      })}
    />
  );
});

ProcedureGroupEditModal.displayName = 'ProcedureGroupEditModal';

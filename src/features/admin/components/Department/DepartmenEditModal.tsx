import { CircularProgress, Modal } from '@mui/material';
import { FC, forwardRef, useCallback } from 'react';

import { useDeleteDepartmentMutation, useGetOneDepartmentQuery } from '@/api/departments';
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
import { IDepartmentDTO } from '@/types/dto';
import { RESOURCES } from '@/types/resources';

import { DepartmentEditForm } from './DepartmentEditForm';

type DepartmentEditModalProps = {
  record: IDepartmentDTO;
} & ICommonAppModalProps;

export const ConnectedDepartmentEditModal: FC = () => {
  const { isOpen, open, close } = useDisclosure(false);
  const record = useAppSelector(
    getCurrentSelectedRow<IDepartmentDTO>(RESOURCES.DEPARTMENT),
  );
  const [deleteDepartment] = useDeleteDepartmentMutation();
  const translate = useTranslate();
  const notifyModal = useNotifyModal();
  const register = useRegisterAdminFunctions();
  register('openEditModal', open);

  const notifySuccess = useGenericNotifySnackbar(
    'success',
    translate.messages.titles.deleteResource({
      resource: translate.resources.department.title().toLowerCase(),
    }),
  );

  const notifyError = useGenericNotifySnackbar(
    'error',
    translate.messages.titles.deleteResource({
      resource: translate.resources.department.title().toLowerCase(),
    }),
  );

  const handleDepartment = useCallback(() => {
    record &&
      notifyModal({
        message: `${translate.messages.notification.delete({
          name: `${record?.name}`,
        })}`,
        options: {
          variant: 'warning',
          onConfirm: () => {
            const res = deleteDepartment({ id: record.id });
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
    deleteDepartment,
    notifyError,
    notifyModal,
    notifySuccess,
    record,
    translate.messages.notification,
  ]);

  register('submitDelete', () => handleDepartment());

  return record ? (
    <Modal open={isOpen}>
      <DepartmentEditModal record={record} closeModal={close} />
    </Modal>
  ) : (
    <></>
  );
};

export const DepartmentEditModal = forwardRef<HTMLElement, DepartmentEditModalProps>(
  (props, ref) => {
    const { closeModal, record } = props;
    const translate = useTranslate();
    const adminFunctions = useAdminFunctions();
    const { data: department } = useGetOneDepartmentQuery({ id: record.id });
    return (
      <>
        <AppModalContent
          ref={ref}
          confirmLabel={translate.buttons.update()}
          handleConfirm={() => adminFunctions.submitEditForm()}
          handleClose={closeModal}
          BodyComponent={
            department ? (
              <DepartmentEditForm record={department} onSuccessCallback={closeModal} />
            ) : (
              <StyledDivCenterChildren>
                <CircularProgress />
              </StyledDivCenterChildren>
            )
          }
          title={translate.messages.titles.editResource({
            resource: translate.resources.department.title().toLowerCase(),
          })}
        />
      </>
    );
  },
);

DepartmentEditModal.displayName = 'DepartmentEditModal';

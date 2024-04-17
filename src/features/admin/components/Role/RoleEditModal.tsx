import { CircularProgress, Modal } from '@mui/material';
import { skipToken } from '@reduxjs/toolkit/dist/query';
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
import { IRoleDTO } from '@/types/dto';
import { RESOURCES } from '@/types/resources';

import { useDeleteRoleMutation, useGetOneRoleQuery } from '../../api/role';

import { RoleEditForm } from './RoleEditForm';

type RoleEditModalProps = {
  record: IRoleDTO;
} & ICommonAppModalProps;

export const ConnectedRoleEditModal: FC = () => {
  const { isOpen, open, close } = useDisclosure(false);
  const record = useAppSelector(getCurrentSelectedRow<IRoleDTO>(RESOURCES.ROLE));
  const { data: roleData } = useGetOneRoleQuery(record ? { id: record?.id } : skipToken);

  const [deleteRole] = useDeleteRoleMutation();
  const translate = useTranslate();
  const notifyModal = useNotifyModal();
  const register = useRegisterAdminFunctions();
  register('openEditModal', open);

  const notifySuccess = useGenericNotifySnackbar(
    'success',
    translate.messages.titles.deleteResource({
      resource: translate.resources.role.title().toLowerCase(),
    }),
  );

  const notifyError = useGenericNotifySnackbar(
    'error',
    translate.messages.titles.deleteResource({
      resource: translate.resources.role.title().toLowerCase(),
    }),
  );

  const handleDeleteRole = useCallback(() => {
    roleData &&
      notifyModal({
        message: `${translate.messages.notification.deleteRole({
          name: `${roleData?.name}`,
        })}`,
        options: {
          variant: 'warning',
          onConfirm: async () => {
            const res = await deleteRole({ id: roleData.id });
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
    deleteRole,
    notifyError,
    notifyModal,
    notifySuccess,
    roleData,
    translate.messages.notification,
  ]);

  register('submitDelete', () => handleDeleteRole());

  return roleData ? (
    <Modal disableEnforceFocus open={isOpen}>
      <RoleEditModal record={roleData} closeModal={close} />
    </Modal>
  ) : (
    <></>
  );
};

export const RoleEditModal = forwardRef<HTMLElement, RoleEditModalProps>((props, ref) => {
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
            <RoleEditForm record={record} onSuccessCallback={closeModal} />
          ) : (
            <StyledDivCenterChildren>
              <CircularProgress />
            </StyledDivCenterChildren>
          )
        }
        title={translate.messages.titles.editResource({
          resource: translate.resources.role.title().toLowerCase(),
        })}
      />
    </>
  );
});

RoleEditModal.displayName = 'RoleEditModal';

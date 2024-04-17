import { CircularProgress, Modal } from '@mui/material';
import React, { useCallback } from 'react';

import { useDeleteUserMutation, useGetOneUserQuery } from '@/api/users';
import { AppModalContent } from '@/components/Elements/Modal/AppModalContent';
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
import { IUserDTO } from '@/types/dto';
import { RESOURCES } from '@/types/resources';

import { useUserForm } from '../../hooks/useUserForm';

import { UserEditForm } from './UserEditForm';

export type UserEditModalProps = { closeModal: () => void; record: IUserDTO };

export const ConnectedUserEditModal = () => {
  const { isOpen, open, close } = useDisclosure(false);
  const register = useRegisterAdminFunctions();
  const translate = useTranslate();
  const notifyModal = useNotifyModal();
  const record = useAppSelector(getCurrentSelectedRow<IUserDTO>(RESOURCES.USER));
  const [deleteUser] = useDeleteUserMutation();
  register('openEditModal', open);

  const notifySuccess = useGenericNotifySnackbar(
    'success',
    translate.messages.titles.deleteResource({
      resource: translate.resources.user.name().toLowerCase(),
    }),
  );

  const notifyError = useGenericNotifySnackbar(
    'error',
    translate.messages.titles.deleteResource({
      resource: translate.resources.user.name().toLowerCase(),
    }),
  );

  const handleDeleteUser = useCallback(() => {
    record &&
      notifyModal({
        message: `${translate.messages.notification.delete({
          name: `${record.username}`,
        })}`,
        options: {
          variant: 'warning',
          onConfirm: () => {
            const res = deleteUser({ id: record.id });

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
    deleteUser,
    notifyError,
    notifyModal,
    notifySuccess,
    record,
    translate.messages.notification,
  ]);

  register('submitDelete', () => handleDeleteUser());

  return record ? (
    <Modal open={isOpen}>
      <UserEditModal closeModal={close} record={record} />
    </Modal>
  ) : (
    <></>
  );
};

export const UserEditModal = (props: UserEditModalProps) => {
  const { closeModal, record } = props;

  const { data: userData } = useGetOneUserQuery({ id: record.id });
  const translate = useTranslate();
  const adminFunctions = useAdminFunctions();
  const { roleData, userGroupData, modalityData } = useUserForm();

  const isVisibleUserEditForm = userData && roleData && userGroupData && modalityData;

  return (
    <AppModalContent
      confirmLabel={translate.buttons.update()}
      handleClose={closeModal}
      BodyComponent={
        isVisibleUserEditForm ? (
          <UserEditForm
            onSuccessCallback={closeModal}
            record={userData}
            listGroup={userGroupData.list}
            listModality={modalityData.list}
            listRole={roleData.list}
          />
        ) : (
          <StyledDivCenterChildren>
            <CircularProgress />
          </StyledDivCenterChildren>
        )
      }
      handleConfirm={() => adminFunctions.submitEditForm()}
      title={translate.messages.titles.editResource({
        resource: translate.resources.user.name().toLowerCase(),
      })}
      width="60%"
    />
  );
};

UserEditModal.displayName = 'UserEditModal';

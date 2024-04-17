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
import { IUserGroupDTO } from '@/types/dto/userGroup';
import { RESOURCES } from '@/types/resources';

import {
  useDeleteUserGroupMutation,
  useGetOneUserGroupQuery,
  useLazyGetOneUserGroupQuery,
} from '../../api/userGroup';
import { useUserGroupForm } from '../../hooks/useUserGroupForm';

import { UserGroupEditForm } from './UserGroupEditForm';

type UserGroupEditModalProps = {
  record: IUserGroupDTO;
} & ICommonAppModalProps;

export const ConnectedUserGroupEditModal: FC = () => {
  const { isOpen, open, close } = useDisclosure(false);
  const record = useAppSelector(
    getCurrentSelectedRow<IUserGroupDTO>(RESOURCES.USER_GROUP),
  );
  const [deleteUserGroup] = useDeleteUserGroupMutation();
  const [getOneGroup] = useLazyGetOneUserGroupQuery();
  const translate = useTranslate();
  const notifyModal = useNotifyModal();
  const register = useRegisterAdminFunctions();
  register('openEditModal', open);

  const notifySuccess = useGenericNotifySnackbar(
    'success',
    translate.messages.titles.deleteResource({
      resource: translate.resources.group.title().toLowerCase(),
    }),
  );

  const notifyError = useGenericNotifySnackbar(
    'error',
    translate.messages.titles.deleteResource({
      resource: translate.resources.group.title().toLowerCase(),
    }),
  );
  /**
   * Get one để lấy name chính xác của group,
   */
  const handleDeleteUserGroup = useCallback(async () => {
    if (record) {
      const groupData = await getOneGroup({ id: record.id }).unwrap();
      notifyModal({
        message: `${translate.messages.notification.delete({
          name: `${groupData?.name}`,
        })}`,
        options: {
          variant: 'warning',
          onConfirm: async () => {
            const res = await deleteUserGroup({ id: record.id });
            if ('error' in res) {
              notifyError();
            } else {
              notifySuccess();
              close();
            }
          },
        },
      });
    }
  }, [
    close,
    deleteUserGroup,
    getOneGroup,
    notifyError,
    notifyModal,
    notifySuccess,
    record,
    translate.messages.notification,
  ]);

  register('submitDelete', () => handleDeleteUserGroup());

  return record ? (
    <Modal disableEnforceFocus open={isOpen}>
      <UserGroupEditModal record={record} closeModal={close} />
    </Modal>
  ) : (
    <></>
  );
};

export const UserGroupEditModal = forwardRef<HTMLElement, UserGroupEditModalProps>(
  (props, ref) => {
    const { closeModal, record } = props;
    const translate = useTranslate();
    const adminFunctions = useAdminFunctions();

    const { data: userGroup } = useGetOneUserGroupQuery({ id: record.id });
    const { listModality, listRole, listModule } = useUserGroupForm();

    return (
      <>
        <AppModalContent
          ref={ref}
          confirmLabel={translate.buttons.update()}
          handleConfirm={() => adminFunctions.submitEditForm()}
          handleClose={closeModal}
          BodyComponent={
            userGroup && listModality && listRole && listModule ? (
              <UserGroupEditForm record={userGroup} onSuccessCallback={closeModal} />
            ) : (
              <StyledDivCenterChildren>
                <CircularProgress />
              </StyledDivCenterChildren>
            )
          }
          title={translate.messages.titles.editResource({
            resource: translate.resources.group.title().toLowerCase(),
          })}
          width="40%"
        />
      </>
    );
  },
);

UserGroupEditModal.displayName = 'UserGroupEditModal';

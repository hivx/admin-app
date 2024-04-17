import { CircularProgress, Modal } from '@mui/material';
import { FC, forwardRef, useCallback } from 'react';

import { useGetListModalityTypeQuery } from '@/api/modalityType';
import {
  AppModalContent,
  ICommonAppModalProps,
} from '@/components/Elements/Modal/AppModalContent';
import { StyledDivCenterChildren } from '@/components/Layout/StyledDiv';
import { useTranslate, useDisclosure, useAppSelector } from '@/hooks';
import {
  useRegisterAdminFunctions,
  useAdminFunctions,
} from '@/providers/Admin/AdminProvider';
import {
  useNotifyModal,
  useGenericNotifySnackbar,
} from '@/providers/NotificationProvider';
import { getCurrentSelectedRow } from '@/stores/table/tableSelectors';
import { IContentGroupDTO } from '@/types/dto';
import { RESOURCES } from '@/types/resources';

import {
  useDeleteContentGroupMutation,
  useGetOneContentGroupQuery,
} from '../../../../api/contentGroup';

import { ContentGroupEditForm } from './ContentGroupEditForm';

type ContentGroupEditModalProps = {
  record: IContentGroupDTO;
} & ICommonAppModalProps;

export const ConnectedContentGroupEditModal: FC = () => {
  const record = useAppSelector(
    getCurrentSelectedRow<IContentGroupDTO>(RESOURCES.CONTENT_GROUP),
  );
  const { isOpen, open, close } = useDisclosure(false);
  const translate = useTranslate();
  const [deleteContentGroup] = useDeleteContentGroupMutation();
  const notifyModal = useNotifyModal();
  const register = useRegisterAdminFunctions();
  register('openEditModal', open);

  const notifySuccess = useGenericNotifySnackbar(
    'success',
    translate.messages.titles.deleteResource({
      resource: translate.resources.contentGroup.title().toLowerCase(),
    }),
  );

  const notifyError = useGenericNotifySnackbar(
    'error',
    translate.messages.titles.deleteResource({
      resource: translate.resources.contentGroup.title().toLowerCase(),
    }),
  );

  const handleDeleteContentGroup = useCallback(() => {
    notifyModal({
      message: `${translate.messages.notification.delete({
        name: `${record?.name}`,
      })}`,
      options: {
        variant: 'warning',
        onConfirm: () => {
          const res = deleteContentGroup({ id: record?.id as number });
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
    deleteContentGroup,
    notifyError,
    notifyModal,
    notifySuccess,
    record?.id,
    record?.name,
    translate.messages.notification,
  ]);

  register('submitDelete', () => handleDeleteContentGroup());
  return record ? (
    <Modal open={isOpen}>
      <ContentGroupEditModal record={record} closeModal={close} />
    </Modal>
  ) : (
    <></>
  );
};

export const ContentGroupEditModal = forwardRef<HTMLElement, ContentGroupEditModalProps>(
  (props, ref) => {
    const { closeModal, record } = props;

    const notifyModal = useNotifyModal();
    const translate = useTranslate();
    const adminFunctions = useAdminFunctions();
    const { data: modalityTypes } = useGetListModalityTypeQuery({
      filter: {},
    });
    const { data: contentGroup } = useGetOneContentGroupQuery({ id: record.id });

    return (
      <AppModalContent
        ref={ref}
        confirmLabel={translate.buttons.update()}
        handleClose={closeModal}
        BodyComponent={
          contentGroup && modalityTypes ? (
            <ContentGroupEditForm
              record={contentGroup}
              modalityTypes={modalityTypes.list}
              onSuccessCallback={closeModal}
            />
          ) : (
            <StyledDivCenterChildren>
              <CircularProgress />
            </StyledDivCenterChildren>
          )
        }
        handleConfirm={() => adminFunctions.submitEditForm()}
        deleteLabel={translate.buttons.delete()}
        handleDelete={() => {
          adminFunctions.submitDelete();
          closeModal();
        }}
        title={translate.messages.titles.editResource({
          resource: translate.resources.contentGroup.title().toLowerCase(),
        })}
      />
    );
  },
);

ContentGroupEditModal.displayName = 'ContentGroupEditModal';

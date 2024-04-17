import { CircularProgress, Modal } from '@mui/material';
import { FC, forwardRef, useCallback } from 'react';

import {
  useDeleteContentMutation,
  useGetOneContentQuery,
  useLazyGetOneContentQuery,
} from '@/api/content';
import { useGetListContentGroupsQuery } from '@/api/contentGroup';
import { useGetListProcedureQuery } from '@/api/procedure';
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
import { IContentDTO } from '@/types/dto';

import { ContentEditForm } from './ContentEditForm';

type ContentEditModalProps = {
  record: IContentDTO;
} & ICommonAppModalProps;

export const ConnectedContentEditModal: FC<{ tableID: string }> = ({ tableID }) => {
  const record = useAppSelector(getCurrentSelectedRow<IContentDTO>(tableID));
  const { isOpen, open, close } = useDisclosure(false);
  const translate = useTranslate();
  const [deleteContent] = useDeleteContentMutation();
  const [getOneContent] = useLazyGetOneContentQuery();
  const register = useRegisterAdminFunctions();
  const notifyModal = useNotifyModal();
  register('openEditModal', open);

  const notifySuccess = useGenericNotifySnackbar(
    'success',
    translate.messages.titles.deleteResource({
      resource: translate.resources.content.title().toLowerCase(),
    }),
  );

  const notifyError = useGenericNotifySnackbar(
    'error',
    translate.messages.titles.deleteResource({
      resource: translate.resources.content.title().toLowerCase(),
    }),
  );

  /**
   * Get one để lấy name chính xác của content,
   */
  const handleDeleteContent = useCallback(async () => {
    if (record) {
      const contentData = await getOneContent({ id: record.id }).unwrap();
      notifyModal({
        message: `${translate.messages.notification.delete({
          name: `${contentData?.name}`,
        })}`,
        options: {
          variant: 'warning',
          onConfirm: () => {
            const res = deleteContent({ id: record.id });
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
    deleteContent,
    getOneContent,
    notifyError,
    notifyModal,
    notifySuccess,
    record,
    translate.messages.notification,
  ]);

  register('submitDelete', () => handleDeleteContent());
  return record ? (
    <Modal disableEnforceFocus open={isOpen}>
      <ContentEditModal record={record} closeModal={close} />
    </Modal>
  ) : (
    <></>
  );
};

export const ContentEditModal = forwardRef<HTMLElement, ContentEditModalProps>(
  (props, ref) => {
    const { closeModal, record } = props;

    const notifyModal = useNotifyModal();
    const translate = useTranslate();
    const adminFunctions = useAdminFunctions();
    const { data: content } = useGetOneContentQuery({ id: record.id });
    const { data: procedureData } = useGetListProcedureQuery({
      filter: {},
    });
    const { data: groupData } = useGetListContentGroupsQuery({
      filter: {},
    });
    return (
      <AppModalContent
        ref={ref}
        confirmLabel={translate.buttons.update()}
        handleClose={closeModal}
        BodyComponent={
          content && procedureData && groupData ? (
            <ContentEditForm
              record={content}
              procedureData={procedureData?.list}
              groupData={groupData?.list}
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
          resource: translate.resources.content.title().toLowerCase(),
        })}
        width="50%"
      />
    );
  },
);

ContentEditModal.displayName = 'ContentEditModal';

import { CircularProgress, Modal } from '@mui/material';
import { FC, forwardRef, useCallback } from 'react';

import {
  useDeleteApplicationMutation,
  useGetOneApplicationQuery,
} from '@/api/application';
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
import { IApplicationDTO } from '@/types/dto/application';
import { RESOURCES } from '@/types/resources';

import { ApplicationEditForm } from './ApplicationEditForm';

type ApplicationEditModalProps = {
  record: IApplicationDTO;
} & ICommonAppModalProps;

export const ConnectedApplicationEditModal: FC = () => {
  const record = useAppSelector(
    getCurrentSelectedRow<IApplicationDTO>(RESOURCES.APPLICATION),
  );
  const { isOpen, open, close } = useDisclosure(false);
  const translate = useTranslate();
  const [deleteApplication] = useDeleteApplicationMutation();
  const register = useRegisterAdminFunctions();

  const notifyModal = useNotifyModal();
  register('openEditModal', open);

  const notifySuccess = useGenericNotifySnackbar(
    'success',
    translate.messages.titles.deleteResource({
      resource: translate.resources.application.title.short().toLowerCase(),
    }),
  );

  const notifyError = useGenericNotifySnackbar(
    'error',
    translate.messages.titles.deleteResource({
      resource: translate.resources.application.title.short().toLowerCase(),
    }),
  );

  const handleDeleteApplication = useCallback(() => {
    notifyModal({
      message: `${translate.messages.notification.delete({
        name: `${record?.name}`,
      })}`,
      options: {
        variant: 'warning',
        onConfirm: () => {
          const res = deleteApplication({ id: record?.id as number });
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
    deleteApplication,
    notifyError,
    notifyModal,
    notifySuccess,
    record?.id,
    record?.name,
    translate.messages.notification,
  ]);

  register('submitDelete', () => handleDeleteApplication());
  return record ? (
    <Modal open={isOpen}>
      <ApplicationEditModal record={record} closeModal={close} />
    </Modal>
  ) : (
    <></>
  );
};

export const ApplicationEditModal = forwardRef<HTMLElement, ApplicationEditModalProps>(
  (props, ref) => {
    const { closeModal, record } = props;
    const { data: applicationData } = useGetOneApplicationQuery(
      { id: record?.id ?? 0 },
      { skip: !record },
    );
    const notifyModal = useNotifyModal();
    const translate = useTranslate();
    const adminFunctions = useAdminFunctions();

    return (
      <AppModalContent
        ref={ref}
        confirmLabel={translate.buttons.update()}
        handleClose={closeModal}
        BodyComponent={
          applicationData ? (
            <ApplicationEditForm
              onSuccessCallback={closeModal}
              record={applicationData}
            />
          ) : (
            <StyledDivCenterChildren>
              <CircularProgress />
            </StyledDivCenterChildren>
          )
        }
        handleConfirm={() => adminFunctions.submitEditForm()}
        deleteLabel={translate.buttons.delete()}
        title={translate.messages.titles.editResource({
          resource: translate.resources.application.title.short().toLowerCase(),
        })}
      />
    );
  },
);

ApplicationEditModal.displayName = 'ApplicationEditModal';

import { CircularProgress, Modal } from '@mui/material';
import { FC, forwardRef, useCallback } from 'react';

import { useDeleteConfigMutation, useGetOneConfigQuery } from '@/api/config';
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
import { IConfigDTO } from '@/types/dto';
import { RESOURCES } from '@/types/resources';

import { ConfigEditForm } from './ConfigEditForm';

type ConfigEditModalProps = {
  record: IConfigDTO;
} & ICommonAppModalProps;

/**
 * Modal wrapper the form edit PACS config
 */
export const ConnectedConfigEditModal: FC = () => {
  const record = useAppSelector(getCurrentSelectedRow<IConfigDTO>(RESOURCES.CONFIG));
  const { isOpen, open, close } = useDisclosure(false);
  const translate = useTranslate();
  const [deleteConfig] = useDeleteConfigMutation();

  const register = useRegisterAdminFunctions();
  const notifyModal = useNotifyModal();
  register('openEditModal', open);

  const notifySuccess = useGenericNotifySnackbar(
    'success',
    translate.messages.titles.deleteResource({
      resource: translate.resources.config.title().toLowerCase(),
    }),
  );

  const notifyError = useGenericNotifySnackbar(
    'error',
    translate.messages.titles.deleteResource({
      resource: translate.resources.config.title().toLowerCase(),
    }),
  );

  const handleDeleteConfig = useCallback(() => {
    record &&
      notifyModal({
        message: `${translate.messages.notification.delete({
          name: `${record?.attribute?.id}`,
        })}`,
        options: {
          variant: 'warning',
          onConfirm: () => {
            const res = deleteConfig({ id: record.id });
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
    deleteConfig,
    notifyError,
    notifyModal,
    notifySuccess,
    record,
    translate.messages.notification,
  ]);

  register('submitDelete', () => handleDeleteConfig());
  return record ? (
    <Modal disableEnforceFocus open={isOpen}>
      <ConfigEditModal record={record} closeModal={close} />
    </Modal>
  ) : (
    <></>
  );
};

export const ConfigEditModal = forwardRef<HTMLElement, ConfigEditModalProps>(
  (props, ref) => {
    const { closeModal, record } = props;
    const { data: configData } = useGetOneConfigQuery(
      { id: record?.id ?? 0 },
      { skip: !record },
    );
    const translate = useTranslate();
    const adminFunctions = useAdminFunctions();

    return (
      <AppModalContent
        ref={ref}
        confirmLabel={translate.buttons.update()}
        handleClose={closeModal}
        BodyComponent={
          <StyledDivCenterChildren>
            {configData ? (
              <ConfigEditForm onSuccessCallback={closeModal} record={configData} />
            ) : (
              <CircularProgress />
            )}
          </StyledDivCenterChildren>
        }
        handleConfirm={() => adminFunctions.submitEditForm()}
        deleteLabel={translate.buttons.delete()}
        handleDelete={() => {
          adminFunctions.submitDelete();
          closeModal();
        }}
        title={translate.messages.titles.editResource({
          resource: translate.resources.config.title().toLowerCase(),
        })}
      />
    );
  },
);

ConfigEditModal.displayName = 'ConfigEditModal';

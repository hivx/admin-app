import { CircularProgress, Modal } from '@mui/material';
import { FC, forwardRef, useCallback } from 'react';

import {
  useDeleteLayoutMutation,
  useGetOneLayoutQuery,
  useLazyGetOneLayoutQuery,
} from '@/api/layout';
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
import { ILayoutDTO } from '@/types/dto/layout';
import { RESOURCES } from '@/types/resources';

import { LayoutEditForm } from './LayoutEditForm';

type LayoutEditModalProps = {
  record: ILayoutDTO;
} & ICommonAppModalProps;

export const ConnectedLayoutEditModal: FC = () => {
  const { isOpen, open, close } = useDisclosure(false);
  const record = useAppSelector(getCurrentSelectedRow<ILayoutDTO>(RESOURCES.LAYOUT));
  const [getOneLayout] = useLazyGetOneLayoutQuery();
  const [deleteLayout] = useDeleteLayoutMutation();
  const translate = useTranslate();
  const notifyModal = useNotifyModal();
  const register = useRegisterAdminFunctions();
  register('openEditModal', open);

  const notifySuccess = useGenericNotifySnackbar(
    'success',
    translate.messages.titles.deleteResource({
      resource: translate.resources.layout.title.short().toLowerCase(),
    }),
  );

  const notifyError = useGenericNotifySnackbar(
    'error',
    translate.messages.titles.deleteResource({
      resource: translate.resources.layout.title.short().toLowerCase(),
    }),
  );

  const handleDeleteLayout = useCallback(async () => {
    if (record) {
      const layoutData = await getOneLayout({ id: record.id }).unwrap();
      notifyModal({
        message: `${translate.messages.notification.delete({
          name: `${layoutData?.name}`,
        })}`,
        options: {
          variant: 'warning',
          onConfirm: () => {
            const res = deleteLayout({ id: record.id });
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
    deleteLayout,
    getOneLayout,
    notifyError,
    notifyModal,
    notifySuccess,
    record,
    translate.messages.notification,
  ]);

  register('submitDelete', () => handleDeleteLayout());

  return record ? (
    <Modal disableEnforceFocus open={isOpen}>
      <LayoutEditModal record={record} closeModal={close} />
    </Modal>
  ) : (
    <></>
  );
};

export const LayoutEditModal = forwardRef<HTMLElement, LayoutEditModalProps>(
  (props, ref) => {
    const { closeModal, record } = props;
    const translate = useTranslate();
    const adminFunctions = useAdminFunctions();

    const { data: layout } = useGetOneLayoutQuery({ id: record.id });

    return (
      <>
        <AppModalContent
          ref={ref}
          confirmLabel={translate.buttons.update()}
          handleConfirm={() => adminFunctions.submitEditForm()}
          handleClose={closeModal}
          BodyComponent={
            layout ? (
              <LayoutEditForm record={layout} onSuccessCallback={closeModal} />
            ) : (
              <StyledDivCenterChildren>
                <CircularProgress />
              </StyledDivCenterChildren>
            )
          }
          title={translate.messages.titles.editResource({
            resource: translate.resources.layout.title.short().toLowerCase(),
          })}
          width="70%"
        />
      </>
    );
  },
);

LayoutEditModal.displayName = 'LayoutEditModal';

import { Modal } from '@mui/material';
import { useState } from 'react';

import { useGetListStoreQuery } from '@/api/store';
import { useTransferStudyMutation } from '@/api/transferStudy';
import { AppModalContent } from '@/components/Elements/Modal/AppModalContent';
import { useDisclosure, useTranslate } from '@/hooks';
import {
  useGenericNotifySnackbar,
  useNotifyModal,
  useNotifySnackbar,
} from '@/providers/NotificationProvider';
import { BaseEntity } from '@/types';

import { TransformStudyModalContent } from './TransformStudyModalContent';

export const TransferStudyModal = ({
  disclosure,
  orderID,
}: {
  disclosure: ReturnType<typeof useDisclosure>;
  orderID: BaseEntity['id'];
}) => {
  const translate = useTranslate();
  const { close, isOpen, open } = disclosure;
  const notify = useNotifyModal();
  const notifySnackBar = useNotifySnackbar();
  const [trigger] = useTransferStudyMutation();
  const { data } = useGetListStoreQuery({ filter: { type: 'TRANSFER' } });
  const stores = data?.list ?? [];
  const [addressID, setAddressID] = useState(stores.length ? stores[0].id : undefined);

  const onChangeTransferAddress = (id: BaseEntity['id']) => {
    setAddressID(id);
  };

  const notifyError = useGenericNotifySnackbar('error', translate.buttons.transfer());
  const notifySuccess = useGenericNotifySnackbar('success', translate.buttons.transfer());

  const onSubmit = async () => {
    const store = stores.find((item) => item.id === addressID);
    if (store) {
      notify({
        message: `Đồng ý chuyển ca chụp đến  ${store?.name} ?`,
        options: {
          variant: 'info',
          onConfirm: async () => {
            try {
              const res = await trigger({ orderID, storeID: store.id });
              if ('error' in res) {
                notifyError();
              } else {
                notifySuccess();
                close();
              }
            } catch (e) {
              notifyError();
            }
          },
          onCancel: () => {},
        },
      });
    }
  };
  return (
    <Modal open={isOpen}>
      <AppModalContent
        title={translate.resources.store.transferDicom()}
        BodyComponent={
          <TransformStudyModalContent
            onChangeTransferAddress={onChangeTransferAddress}
            stores={stores}
            addressID={addressID}
          />
        }
        handleClose={close}
        handleConfirm={onSubmit}
        BoxBodyProps={{ minHeight: '10vh' }}
        confirmLabel={translate.buttons.transfer()}
        width="400px"
      />
    </Modal>
  );
};

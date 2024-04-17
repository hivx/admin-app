import { Modal } from '@mui/material';

import { useDisclosure } from '@/hooks';
import { BaseEntity } from '@/types';

import { ModalContentWrapper } from './ModalContentWrapper';

type OrderPrintImageModalProps = {
  disclosure: ReturnType<typeof useDisclosure>;
  orderID: BaseEntity['id'];
};

export const OrderPrintImageModal = (props: OrderPrintImageModalProps) => {
  const { disclosure, orderID } = props;
  return (
    <>
      <Modal open={disclosure.isOpen} disableEnforceFocus>
        <ModalContentWrapper close={disclosure.close} orderID={orderID} />
      </Modal>
    </>
  );
};

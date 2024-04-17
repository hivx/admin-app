import { Modal } from '@mui/material';

import { useDisclosure } from '@/hooks';

import { ChangePasswordForm } from './ChangePasswordForm';

type OrderPrintImageModalProps = {
  disclosure: ReturnType<typeof useDisclosure>;
};

export const ModalChangePassword = (props: OrderPrintImageModalProps) => {
  const { disclosure } = props;
  return (
    <Modal open={disclosure.isOpen} disableEnforceFocus>
      <ChangePasswordForm disclosure={disclosure} />
    </Modal>
  );
};

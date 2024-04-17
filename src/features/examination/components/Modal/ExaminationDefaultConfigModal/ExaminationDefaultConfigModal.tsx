import { Modal } from '@mui/material';
import React from 'react';

import { AppModalContent } from '@/components/Elements/Modal/AppModalContent';
import { useDisclosure, useTranslate } from '@/hooks';
import {
  useOrderListFunctions,
  useRegisterOrderListFunctions,
} from '@/providers/Order/OrderListFunctionsProvider';

import { ExaminationConfigFormWrapper } from './ExaminationConfigFormField';

export const ExaminationDefaultConfigModal = () => {
  const register = useRegisterOrderListFunctions();
  const orderListFunctions = useOrderListFunctions();
  const translate = useTranslate();
  const disclosure = useDisclosure();

  const openConfigRequestModal = () => {
    disclosure.open();
  };
  register('openConfigRequestModal', openConfigRequestModal);

  const handleConfirm = () => {
    orderListFunctions.submitEditConfigForm();
  };
  return disclosure.isOpen ? (
    <Modal open={disclosure.isOpen}>
      <AppModalContent
        BodyComponent={<ExaminationConfigFormWrapper />}
        title={translate.resources.order.infomationOrderDefault()}
        handleClose={disclosure.close}
        handleConfirm={handleConfirm}
        confirmLabel={translate.buttons.update()}
        width="400px"
      />
    </Modal>
  ) : (
    <></>
  );
};

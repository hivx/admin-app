import React, { useCallback } from 'react';

import { useDisclosure, useTranslate } from '@/hooks';
import { useRegisterOrderListFunctions } from '@/providers/Order/OrderListFunctionsProvider';

import { ConnectedCreateOrderModal } from './CreateOrderModal';

/**
 * Handle open state of create modal
 */
export const CreateOrderMain = () => {
  const disclosure = useDisclosure();
  const translate = useTranslate();
  const register = useRegisterOrderListFunctions();
  const openCreateOrderModal = useCallback(() => {
    disclosure.open();
  }, [disclosure]);
  register('openCreateOrderModal', openCreateOrderModal);

  return disclosure.isOpen ? (
    <ConnectedCreateOrderModal
      disclosure={disclosure}
      title={translate.resources.order.createOrder()}
      handleClose={disclosure.close}
    />
  ) : (
    <></>
  );
};

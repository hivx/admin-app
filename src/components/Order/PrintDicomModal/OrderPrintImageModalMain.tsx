import React, { useState } from 'react';

import { useDisclosure } from '@/hooks';
import { useRegisterOrderListFunctions } from '@/providers/Order/OrderListFunctionsProvider';
import { BaseEntity } from '@/types';

import { OrderPrintImageModal } from './OrderPrintImageModal';

const OrderPrintImageModalMain = () => {
  const disclosure = useDisclosure(false);
  const [orderID, setOrderID] = useState<BaseEntity['id']>();
  const register = useRegisterOrderListFunctions();
  const openPrintImageModal = (orderID?: BaseEntity['id']) => {
    setOrderID(orderID);
    disclosure.open();
  };
  register('openPrintImageModal', openPrintImageModal);
  return <OrderPrintImageModal disclosure={disclosure} orderID={orderID ?? 0} />;
};

export default OrderPrintImageModalMain;

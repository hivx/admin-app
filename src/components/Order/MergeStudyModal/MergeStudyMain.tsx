import React, { useCallback, useState } from 'react';

import { useDisclosure } from '@/hooks';
import { useRegisterOrderListFunctions } from '@/providers/Order/OrderListFunctionsProvider';
import { BaseEntity } from '@/types';

import { ConnectedMergeStudy } from '.';

/**
 * Handle open state of quick report modal
 */
export const MergeStudyMain = () => {
  const [orderID, setOrderID] = useState<BaseEntity['id'] | undefined>();
  const disclosure = useDisclosure();
  const register = useRegisterOrderListFunctions();
  /**
   * Handle open modal and set orderID state
   */
  const openMergeStudyModal = useCallback(
    (orderID: BaseEntity['id']) => {
      setOrderID(orderID);
      disclosure.open();
    },
    [disclosure],
  );
  register('openMergeStudyModal', openMergeStudyModal);

  return orderID && disclosure.isOpen ? (
    <ConnectedMergeStudy orderID={orderID} disclosure={disclosure} />
  ) : (
    <></>
  );
};

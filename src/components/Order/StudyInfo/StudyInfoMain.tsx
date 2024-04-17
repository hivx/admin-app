import React, { useCallback, useState } from 'react';

import { useDisclosure, useTranslate } from '@/hooks';
import { useRegisterOrderListFunctions } from '@/providers/Order/OrderListFunctionsProvider';
import { BaseEntity } from '@/types';

import { ConnectedStudyInfoModal } from './StudyInfoModal';

/**
 * Handle open state of quick report modal
 */
export const StudyInfoMain = () => {
  const [orderID, setOrderID] = useState<BaseEntity['id'] | undefined>();
  const disclosure = useDisclosure();
  const translate = useTranslate();
  const register = useRegisterOrderListFunctions();
  const openStudyInfoModal = useCallback(
    (orderID: BaseEntity['id']) => {
      setOrderID(orderID);
      disclosure.open();
    },
    [disclosure],
  );
  register('openStudyInfoModal', openStudyInfoModal);

  return orderID && disclosure.isOpen ? (
    <ConnectedStudyInfoModal
      key={orderID}
      orderID={orderID}
      disclosure={disclosure}
      title={translate.studyInfo.title()}
      handleClose={disclosure.close}
    />
  ) : (
    <></>
  );
};

import { useCallback, useState } from 'react';

import { useDisclosure } from '@/hooks';
import { useRegisterOrderListFunctions } from '@/providers/Order/OrderListFunctionsProvider';
import { BaseEntity } from '@/types';

import { useLockOrder } from '../../../../../hooks/lockOrder/useLockOrder';

import { QuickReportModal } from './QuickReportModal';

/**
 * Handle open state of quick report modal
 * Perform validation before opening report modal
 */
export const QuickReportMain = () => {
  const [orderID, setOrderID] = useState<BaseEntity['id'] | undefined>();
  const [reportID, setReportID] = useState<BaseEntity['id'] | undefined>();
  const disclosure = useDisclosure();
  const register = useRegisterOrderListFunctions();
  const handleLockOrder = useLockOrder();

  const openQuickReportModal = useCallback(
    async (orderID: BaseEntity['id'], reportID: BaseEntity['id']) => {
      const success = await handleLockOrder(orderID);
      if (success) {
        setOrderID(orderID);
        setReportID(reportID);
        disclosure.open();
      }
    },
    [disclosure, handleLockOrder],
  );
  register('openQuickReportModal', openQuickReportModal);
  return orderID ? (
    <QuickReportModal
      key={orderID}
      orderID={orderID}
      disclosure={disclosure}
      reportID={reportID}
    />
  ) : (
    <></>
  );
};

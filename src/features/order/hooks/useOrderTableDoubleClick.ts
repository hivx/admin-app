import { useCallback } from 'react';

import { useAppSelector } from '@/hooks';
import { useLockOrderButton } from '@/hooks/lockOrder/useLockOrderButton';
import { useOrderListFunctions } from '@/providers/Order/OrderListFunctionsProvider';
import { selectCurrentUser } from '@/stores/auth';
import { TABLE_ORDER } from '@/stores/table/tableInitialState';
import { getCurrentSelectedRow } from '@/stores/table/tableSelectors';
import { IOrderDTO } from '@/types/dto';

import { useOpenOrderInNewTab } from './useOpenOrderInNewTab';

export const useOrderTableDoubleClick = () => {
  const user = useAppSelector(selectCurrentUser);
  const rowSelected = useAppSelector(getCurrentSelectedRow<IOrderDTO>(TABLE_ORDER));
  const orderListFunctions = useOrderListFunctions();
  const handleOpenOrderInNewTab = useOpenOrderInNewTab({
    order: rowSelected,
  });
  const { onClick: onLockOrder } = useLockOrderButton(rowSelected);
  // const { onClick } = useButtonImage({ order: rowSelected });
  const onClick = useCallback(async () => {
    handleOpenOrderInNewTab();
    onLockOrder();
  }, [handleOpenOrderInNewTab, onLockOrder]);

  const handleDoubleClick = useCallback(
    (order: IOrderDTO) => {
      // action double click depending on user type
      switch (user?.type) {
        case 'IMAGING_DOCTOR':
          onClick();
          break;
        default:
          orderListFunctions.openStudyInfoModal(order.id);
      }
    },
    [onClick, orderListFunctions, user?.type],
  );
  return handleDoubleClick;
};

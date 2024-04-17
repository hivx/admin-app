import { Icon } from '@mui/material';
import { ComponentProps, useCallback } from 'react';

import { useUserPermission } from '@/providers/AuthProvider';
import { useOrderListFunctions } from '@/providers/Order/OrderListFunctionsProvider';

/**
 * Hook to get func and status of create order button
 */
export const useCreateOrder = () => {
  const orderListFunctions = useOrderListFunctions();
  const userPermisions = useUserPermission();

  const buttonIsActive = userPermisions?.userCanMergeOrder;
  const iconColor: ComponentProps<typeof Icon>['color'] = buttonIsActive
    ? 'action'
    : 'disabled';
  const openCreateOrderModal = useCallback(
    () => orderListFunctions.openCreateOrderModal(),
    [orderListFunctions],
  );
  return { buttonIsActive, iconColor, openCreateOrderModal };
};

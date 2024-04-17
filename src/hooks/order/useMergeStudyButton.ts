import { Icon } from '@mui/material';
import { ComponentProps, useCallback } from 'react';

// import { useUserPermission } from '@/providers/AuthProvider';
import { useOrderListFunctions } from '@/providers/Order/OrderListFunctionsProvider';
import { IOrderDTO, ORDER_CREATION_TYPE } from '@/types/dto';

/**
 * Hook to get func and status of merge study button
 */
export const useMergeStudyButton = (order?: IOrderDTO) => {
  const orderListFunctions = useOrderListFunctions();
  // const userPermisions = useUserPermission();

  const buttonIsActive =
    order?.creationType === ORDER_CREATION_TYPE.TAG &&
    // userPermisions?.userCanMergeOrder &&
    order.study;
  const iconColor: ComponentProps<typeof Icon>['color'] = buttonIsActive
    ? 'action'
    : 'disabled';
  const openMergeStudyModal = useCallback(
    () => orderListFunctions.openMergeStudyModal(order?.id),
    [order?.id, orderListFunctions],
  );
  return { buttonIsActive, iconColor, openMergeStudyModal };
};

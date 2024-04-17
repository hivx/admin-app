import { useCallback } from 'react';

import { useOrderListFunctions } from '@/providers/Order/OrderListFunctionsProvider';

export const useCreateFolderButton = () => {
  const orderListFunctions = useOrderListFunctions();
  const handleClickOpenCreateBookmarkFolder = useCallback(() => {
    orderListFunctions.openBookmarkFolderModal();
  }, [orderListFunctions]);

  return {
    handleClickOpenCreateBookmarkFolder,
  };
};

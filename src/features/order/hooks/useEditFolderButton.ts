import { useCallback } from 'react';

import { useOrderListFunctions } from '@/providers/Order/OrderListFunctionsProvider';

export const useEditFolderButton = () => {
  const orderListFunctions = useOrderListFunctions();
  const isEdit = true;
  const handleClickOpenEditBookmarkFolder = useCallback(() => {
    orderListFunctions.openBookmarkFolderModal(isEdit);
  }, [isEdit, orderListFunctions]);

  return {
    handleClickOpenEditBookmarkFolder,
  };
};

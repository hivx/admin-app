import React, { useCallback, useState } from 'react';

import { useDisclosure } from '@/hooks';
import { useRegisterOrderListFunctions } from '@/providers/Order/OrderListFunctionsProvider';

import { ConnectedBookmarkFolderModal } from './ConnectedBookmarkFolderModal';

/**
 * Handle open state of bookmark folder modal
 */
export const BookmarkFolderMain = () => {
  const disclosure = useDisclosure();
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const register = useRegisterOrderListFunctions();

  const openBookmarkFolderModal = useCallback(
    (isEdit: boolean) => {
      setIsEdit(isEdit);
      disclosure.open();
    },
    [disclosure],
  );
  register('openBookmarkFolderModal', openBookmarkFolderModal);

  return disclosure.isOpen ? (
    <ConnectedBookmarkFolderModal
      disclosure={disclosure}
      handleClose={disclosure.close}
      isEdit={isEdit}
    />
  ) : (
    <></>
  );
};

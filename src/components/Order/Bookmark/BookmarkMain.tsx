import React, { useCallback, useState } from 'react';

import { useDisclosure, useTranslate } from '@/hooks';
import { useRegisterOrderListFunctions } from '@/providers/Order/OrderListFunctionsProvider';
import { IBookmarkDTO, IOrderDTO } from '@/types/dto';

import { ConnectedBookmarkModal } from './ConnectedBookmarkModal';

/**
 * Handle open state of bookmark modal
 */
export const BookmarkMain = () => {
  const [orderID, setOrderID] = useState<IOrderDTO['id'] | undefined>();
  const [bookmarks, setBookmarks] = useState<IBookmarkDTO[]>([]);
  const disclosure = useDisclosure();
  const translate = useTranslate();
  const register = useRegisterOrderListFunctions();

  const openBookmarkModal = useCallback(
    (orderID: IOrderDTO['id'], bookmarks: IBookmarkDTO[]) => {
      setOrderID(orderID);
      setBookmarks(bookmarks);
      disclosure.open();
    },
    [disclosure],
  );
  register('openBookmarkModal', openBookmarkModal);

  return orderID && disclosure.isOpen ? (
    <ConnectedBookmarkModal
      key={orderID}
      orderID={orderID}
      disclosure={disclosure}
      title={translate.bookmark.title()}
      handleClose={disclosure.close}
      bookmarks={bookmarks}
    />
  ) : (
    <></>
  );
};

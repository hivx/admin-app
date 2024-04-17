import { useCallback, useEffect } from 'react';

import { useLazyGetListBookmarkQuery } from '@/api/bookmark';
import { HOTKEYS } from '@/config';
import { useUserPermission } from '@/providers/AuthProvider';
import { useOrderListFunctions } from '@/providers/Order/OrderListFunctionsProvider';
import { selectCurrentUser } from '@/stores/auth';
import { IOrderDTO } from '@/types/dto';

import { useKeybinds } from './useKeybinds';

import { useAppSelector } from '.';

export const useBookmarkButton = (order?: IOrderDTO, closeMenu?: () => void) => {
  const orderID = order?.id;
  const orderListFunctions = useOrderListFunctions();
  const userPermissions = useUserPermission();

  const isActiveIcon = order && order.study?.id && userPermissions?.userCanBookmark;

  const disabled = !isActiveIcon;

  useKeybinds(
    HOTKEYS.BOOKMARK.key,
    () => {
      handleClick();
    },
    {
      disabled: disabled,
    },
  );

  const currentUser = useAppSelector(selectCurrentUser);

  const [triggerBookmarksData, { data: bookmarksData }] = useLazyGetListBookmarkQuery();

  useEffect(() => {
    if (orderID && !disabled) {
      triggerBookmarksData({
        filter: { orderID, ownerID: currentUser?.id ?? 0 },
      });
    }
  }, [currentUser?.id, disabled, order, orderID, triggerBookmarksData]);

  const bookmarks = bookmarksData?.list;

  const handleClick = useCallback(() => {
    order && orderListFunctions.openBookmarkModal(order.id, bookmarks);
    closeMenu && closeMenu();
  }, [bookmarks, closeMenu, order, orderListFunctions]);

  return {
    handleClick,
    bookmarks,
    disabled,
  };
};

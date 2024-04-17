import { MouseEvent, MouseEventHandler } from 'react';
import { useMatch, useNavigate } from 'react-router-dom';
import urlJoin from 'url-join';

import { ROUTE_ORDER_LIST } from '@/features/order';
import { deleteTab, deleteAllTab, deleteOtherTab } from '@/stores/tabs/tabSlice';
import { ITabItem } from '@/types';

import { useContextMenu } from './useContextMenu';

import { useAppDispatch, useTranslate } from '.';

export const useTab = (tab?: ITabItem, closeOneTabCallback?: () => void) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const translate = useTranslate();
  const tabMenuID = `tab${tab?.href}`;
  const { close } = useContextMenu(tabMenuID);
  const { open } = useContextMenu(tabMenuID);
  const orderListHref = urlJoin(ROUTE_ORDER_LIST);
  const tabID = tab?.id;
  const isActive = Boolean(useMatch(`${tab?.href}/*`));

  /**
   * Redirect orderlist page
   */
  const redirectOrderList = () => {
    navigate(orderListHref);
  };

  /**
   * Delete Tab by id right click menu
   * When delete tab by id will redirect order list page,
   * And delete lock this order
   */
  const handleDeleteTab = () => {
    tabID && dispatch(deleteTab(tabID));
    closeOneTabCallback && closeOneTabCallback();
    close();
    redirectOrderList();
  };

  /**
   * Delete Tabs by ids right click menu
   * When delete tabs by ids will redirect order list page
   */
  const handleDeleteAllTab = () => {
    dispatch(deleteAllTab());
    close();
    redirectOrderList();
  };

  /**
   * Delete other Tab isn't current id right click menu
   * When delete tabs isn't current id will redirect Tab current id
   */
  const handleDeleteOtherTab = () => {
    tabID && dispatch(deleteOtherTab(tabID));
    tabID && navigate(`${orderListHref}/${tabID}`);
    close();
  };

  /**
   * Delete Tab by id button close on tab
   * When delete tab by id will redirect order list page,
   * And delete lock this order
   */
  const handleClose: MouseEventHandler<HTMLButtonElement> = (e) => {
    tabID && dispatch(deleteTab(tabID));
    closeOneTabCallback && closeOneTabCallback();
    redirectOrderList();
    e.preventDefault();
  };

  const handleContextMenu = (e: MouseEvent<HTMLAnchorElement>) => {
    open(e);
    e.preventDefault();
  };

  return {
    translate,
    isActive,
    tabMenuID,
    handleContextMenu,
    handleClose,
    redirectOrderList,
    handleDeleteTab,
    handleDeleteAllTab,
    handleDeleteOtherTab,
  };
};

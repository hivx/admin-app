import React from 'react';

import ItechQuickReadIcon from '@/assets/icon/QuickReadIcon';
import { ContextMenuItemShell } from '@/components/Menu/ContextMenuItemShell';
import { HOTKEYS } from '@/config';
import { useTranslate } from '@/hooks';
import { useUserPermission } from '@/providers/AuthProvider';
import { useOrderListFunctions } from '@/providers/Order/OrderListFunctionsProvider';
import { BaseEntity } from '@/types';

export const QuickReportMenuItem = (props: {
  orderID: BaseEntity['id'];
  closeMenu?: () => void;
}) => {
  const { orderID, closeMenu } = props;
  const translate = useTranslate();
  const userPermissions = useUserPermission();
  const orderListFunctions = useOrderListFunctions();
  const disabled = !userPermissions?.userCanLockOrder;
  const handleOpenQuickReportModal = () => {
    orderListFunctions.openQuickReportModal(orderID);
    closeMenu && closeMenu();
  };
  return (
    <ContextMenuItemShell
      MenuItemProps={{ onClick: handleOpenQuickReportModal, disabled }}
      MainComponent={translate.buttons.quickReport()}
      IconComponent={<ItechQuickReadIcon fontSize="small" color="inherit" />}
      hotkeyString={HOTKEYS.QUICK_REPORT.title}
    />
  );
};

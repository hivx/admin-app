import React from 'react';

import ItechUpdateOrderInfo from '@/assets/icon/UpdateOrderInfo';
import { ContextMenuItemShell } from '@/components/Menu/ContextMenuItemShell';
import { HOTKEYS } from '@/config';
import { useKeybinds, useTranslate } from '@/hooks';
import { useOrderListFunctions } from '@/providers/Order/OrderListFunctionsProvider';
import { BaseEntity } from '@/types';

export const StudyInfoMenuItem = (props: {
  orderID: BaseEntity['id'];
  closeMenu?: () => void;
}) => {
  const { orderID, closeMenu } = props;
  const orderListFunctions = useOrderListFunctions();
  const translate = useTranslate();
  const handleOpenStudyInfoModal = () => {
    orderListFunctions.openStudyInfoModal(orderID);
    closeMenu && closeMenu();
  };
  useKeybinds(HOTKEYS.STUDY_INFO.key, () => handleOpenStudyInfoModal(), {
    disabled: !orderID,
  });
  return (
    <ContextMenuItemShell
      IconComponent={<ItechUpdateOrderInfo fontSize="small" color="inherit" />}
      MenuItemProps={{ onClick: handleOpenStudyInfoModal }}
      MainComponent={translate.buttons.requestInfo()}
      hotkeyString={HOTKEYS.STUDY_INFO.title}
    />
  );
};

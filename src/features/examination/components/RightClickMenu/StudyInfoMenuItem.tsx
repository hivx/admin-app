import { Typography } from '@mui/material';
import React, { useCallback } from 'react';

import ItechUpdateOrderInfo from '@/assets/icon/UpdateOrderInfo';
import { ContextMenuItemShell } from '@/components/Menu/ContextMenuItemShell';
import { useTranslate } from '@/hooks';
import { useOrderListFunctions } from '@/providers/Order/OrderListFunctionsProvider';

import { ExaminationRightClickMenuItemProps } from './ExaminationRightClickMenu';

export const StudyInfoMenuItem = (props: ExaminationRightClickMenuItemProps) => {
  const { order, closeMenu } = props;
  const translate = useTranslate();
  const orderListFunctions = useOrderListFunctions();
  const disabled = !order;

  const handleClick = useCallback(() => {
    order && orderListFunctions.openStudyInfoModal(order.id);
    closeMenu();
  }, [closeMenu, order, orderListFunctions]);
  return (
    <ContextMenuItemShell
      MenuItemProps={{
        disabled: disabled,
        onClick: handleClick,
      }}
      IconComponent={<ItechUpdateOrderInfo fontSize="small" />}
      MainComponent={<Typography>{translate.buttons.requestInfo()}</Typography>}
      hotkeyString="Alt + R"
    />
  );
};

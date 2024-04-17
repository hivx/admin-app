import { Typography } from '@mui/material';
import React from 'react';

import { PrintImageIcon } from '@/assets/icon';
import { ContextMenuItemShell } from '@/components/Menu/ContextMenuItemShell';
import { HOTKEYS } from '@/config';
import { useTranslate } from '@/hooks';
import { useOrderListFunctions } from '@/providers/Order/OrderListFunctionsProvider';
import { BUTTON_STATE } from '@/types';
import { IOrderDTO } from '@/types/dto';

import { usePrintDicomButtonState } from '../../../../../features/order/hooks/usePrintDicomButtonState';

export const PrintImageDicomMenuItem = (props: {
  order: IOrderDTO;
  closeMenu?: () => void;
}) => {
  const { order, closeMenu } = props;
  const translate = useTranslate();
  const orderListFunctions = useOrderListFunctions();
  const buttonPrintDicomState = usePrintDicomButtonState(order);
  const disabled = buttonPrintDicomState === BUTTON_STATE.DISABLED;
  const iconColor = disabled ? 'disabled' : 'action';

  const handleOpenQuickReportModal = () => {
    orderListFunctions.openPrintImageModal(order.id);
    closeMenu && closeMenu();
  };
  return (
    <ContextMenuItemShell
      MenuItemProps={{ disabled: disabled, onClick: handleOpenQuickReportModal }}
      IconComponent={<PrintImageIcon fontSize="small" color={iconColor} />}
      MainComponent={<Typography>{translate.buttons.printDicomImage()}</Typography>}
      hotkeyString={HOTKEYS.PRINT_DICOM_IMAGE.title}
    />
  );
};

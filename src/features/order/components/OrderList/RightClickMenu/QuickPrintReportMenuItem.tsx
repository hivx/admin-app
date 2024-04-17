import { Typography } from '@mui/material';
import { MouseEventHandler } from 'react';

import { PrintQuickIcon } from '@/assets/icon';
import { ContextMenuItemShell } from '@/components/Menu/ContextMenuItemShell';
import { useTranslate } from '@/hooks';
import { useQuickPrintReportButton } from '@/hooks/order/useQuickPrintReportButton';
import { BUTTON_STATE } from '@/types';
import { IOrderDTO } from '@/types/dto';

export const QuickPrintReportMenuItem = (props: {
  order: IOrderDTO;
  closeMenu: () => void;
}) => {
  const { order, closeMenu } = props;
  const translate = useTranslate();
  const { buttonState, onListItemClick } = useQuickPrintReportButton(order);

  const handleClick: MouseEventHandler<HTMLLIElement> = (e) => {
    closeMenu();
    onListItemClick && onListItemClick();
  };
  return (
    <ContextMenuItemShell
      MenuItemProps={{
        disabled: buttonState === BUTTON_STATE.DISABLED,
        onClick: handleClick,
      }}
      IconComponent={<PrintQuickIcon fontSize="small" />}
      MainComponent={
        <Typography>{translate.buttons.printPreviewRadiologyReport()}</Typography>
      }
      hotkeyString="Ctrl + I"
    />
  );
};

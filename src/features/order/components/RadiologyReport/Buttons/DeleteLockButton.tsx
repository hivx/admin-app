import React from 'react';

import { ItechShutdownIcon } from '@/assets/icon';
import { IconButtonWithToolTip } from '@/components/Elements/Buttons/IconButtonWithToolTip';
import { TableSVGIcon } from '@/components/Table/TableSVGIcon';
import { useTranslate } from '@/hooks';
import { useDeleteLockOrderButton } from '@/hooks/lockOrder/useDeleteLockOrderButton';
import { BUTTON_STATE } from '@/types';

export const DeleteLockButton = () => {
  const translate = useTranslate();
  const { buttonState: deleteLockButtonState, onClick: onDeleteButtonClick } =
    useDeleteLockOrderButton();
  return (
    <IconButtonWithToolTip
      title={translate.pages.orderReport.actions.deleteLock()}
      onClick={onDeleteButtonClick}
      color="inherit"
      disabled={deleteLockButtonState === BUTTON_STATE.DISABLED}
    >
      <TableSVGIcon IconComponent={ItechShutdownIcon} />
    </IconButtonWithToolTip>
  );
};
// ItechDeleteLockIcon

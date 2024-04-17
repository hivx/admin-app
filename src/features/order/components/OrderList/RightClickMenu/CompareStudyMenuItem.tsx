import { Typography } from '@mui/material';
import React from 'react';

import { ItechCompareImageIcon } from '@/assets/icon';
import { ContextMenuItemShell } from '@/components/Menu/ContextMenuItemShell';
import { useAppSelector, useTranslate } from '@/hooks';
import { TABLE_ORDER } from '@/stores/table/tableInitialState';
import { getCurrentSelectedRow } from '@/stores/table/tableSelectors';
import { BUTTON_STATE } from '@/types';
import { IOrderDTO } from '@/types/dto';

import { useCompareStudyMenuItem } from '../../../hooks/useCompareStudyMenuItem';

/**
 * Menu so sánh ca
 */
export const CompareStudyMenuItem = ({
  metadata,
  closeMenu,
}: {
  metadata: IOrderDTO;
  closeMenu: () => void;
}) => {
  const translate = useTranslate();
  const record = useAppSelector(getCurrentSelectedRow<IOrderDTO>(TABLE_ORDER));
  const { menuState, openInNewTab } = useCompareStudyMenuItem({
    fisrtOrder: record,
    secondOrder: metadata,
  });
  return (
    <ContextMenuItemShell
      MenuItemProps={{
        disabled: menuState === BUTTON_STATE.DISABLED,
        onClick: () => {
          closeMenu();
          openInNewTab();
        },
      }}
      IconComponent={<ItechCompareImageIcon fontSize="small" color="inherit" />}
      MainComponent={
        <Typography color="inherit">{translate.buttons.compareOrder()}</Typography>
      }
    />
  );
};

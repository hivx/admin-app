import React from 'react';

import { ItechCompareImageIcon } from '@/assets/icon';
import { ContextMenuItemShell } from '@/components/Menu/ContextMenuItemShell';
import { useTranslate } from '@/hooks';
import { BUTTON_STATE } from '@/types';
import { IOrderDTO } from '@/types/dto';

import { useCompareStudyButton } from '../../../hooks/useCompareStudyButton';

export const CompareStudyOrderHistoryMenu = ({
  metadata,
  closeMenu,
}: {
  metadata: IOrderDTO;
  closeMenu: () => void;
}) => {
  const translate = useTranslate();
  const { buttonState: compareStudyButtonState, openInNewTab } = useCompareStudyButton();
  const isActive = compareStudyButtonState === BUTTON_STATE.ACTIVE;

  return (
    <ContextMenuItemShell
      IconComponent={<ItechCompareImageIcon fontSize="small" color="inherit" />}
      MenuItemProps={{
        onClick: () => {
          closeMenu();
          openInNewTab();
        },
        disabled: !isActive,
      }}
      MainComponent={translate.buttons.dicomCompare()}
    />
  );
};

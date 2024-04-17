import { Typography } from '@mui/material';
import React, { FC } from 'react';

import { ViewImageIcon } from '@/assets/icon';
import { ContextMenuItemShell } from '@/components/Menu/ContextMenuItemShell';
import { useTranslate } from '@/hooks';
import { useButtonImage } from '@/hooks/result/useButtonImage';
import { BUTTON_STATE } from '@/types';

import { ExaminationRightClickMenuItemProps } from './ExaminationRightClickMenu';

export const ViewImageMenuItem: FC<ExaminationRightClickMenuItemProps> = (props) => {
  const { order, closeMenu } = props;
  const { onClick, buttonState } = useButtonImage({ order });
  const translate = useTranslate();
  const onClickButton = () => {
    onClick();
    closeMenu();
  };
  return (
    <ContextMenuItemShell
      MenuItemProps={{
        disabled: buttonState === BUTTON_STATE.DISABLED,
        onClick: onClickButton,
      }}
      IconComponent={<ViewImageIcon fontSize="small" />}
      MainComponent={<Typography>{translate.buttons.viewImage()}</Typography>}
      hotkeyString="Alt + V"
    />
  );
};

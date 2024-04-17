import { Typography } from '@mui/material';
import React, { FC } from 'react';

import { ViewImageIcon } from '@/assets/icon';
import { ContextMenuItemShell } from '@/components/Menu/ContextMenuItemShell';
import { useTranslate } from '@/hooks';
import { BUTTON_STATE } from '@/types';
import { IOrderDTO } from '@/types/dto';

import useViewImageButton from '../../../hooks/useViewImageButton';

type ViewImageMenuItemProps = {
  order: IOrderDTO;
};
export const ViewImageMenuItem: FC<ViewImageMenuItemProps> = (props) => {
  const { order } = props;
  const { buttonState, onListItemClick } = useViewImageButton({ orders: [order] });
  const translate = useTranslate();
  return (
    <ContextMenuItemShell
      MenuItemProps={{
        disabled: buttonState === BUTTON_STATE.DISABLED,
        onClick: onListItemClick,
      }}
      IconComponent={<ViewImageIcon fontSize="small" />}
      MainComponent={<Typography>{translate.buttons.viewImage()}</Typography>}
      hotkeyString="Alt + V"
    />
  );
};

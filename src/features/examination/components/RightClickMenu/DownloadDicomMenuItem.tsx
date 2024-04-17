import { Typography } from '@mui/material';
import React, { FC } from 'react';

import { ItechDownloadIcon } from '@/assets/icon';
import { ContextMenuItemShell } from '@/components/Menu/ContextMenuItemShell';
import { useTranslate } from '@/hooks';
import { useDownloadDicomImage } from '@/hooks/order/useDownloadDicomImage';

import { ExaminationRightClickMenuItemProps } from './ExaminationRightClickMenu';

export const DownloadDicomMenuItem: FC<ExaminationRightClickMenuItemProps> = ({
  closeMenu,
  order,
}) => {
  const translate = useTranslate();
  const { buttonIsActive, handleClickOpenNewTab } = useDownloadDicomImage(order);
  const handleClick = () => {
    handleClickOpenNewTab();
    closeMenu();
  };
  return (
    <ContextMenuItemShell
      MenuItemProps={{
        disabled: !buttonIsActive,
        onClick: handleClick,
      }}
      IconComponent={<ItechDownloadIcon fontSize="small" />}
      MainComponent={<Typography>{translate.buttons.dowloadDicomImage()}</Typography>}
      hotkeyString="Alt + P"
    />
  );
};

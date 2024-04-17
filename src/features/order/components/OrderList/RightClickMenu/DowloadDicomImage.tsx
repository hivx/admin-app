import { Typography } from '@mui/material';
import React from 'react';

import { ItechDownloadIcon } from '@/assets/icon';
import { ContextMenuItemShell } from '@/components/Menu/ContextMenuItemShell';
import { HOTKEYS } from '@/config';
import { useTranslate } from '@/hooks';
import { useDownloadDicomImage } from '@/hooks/order/useDownloadDicomImage';
import { IOrderDTO } from '@/types/dto';

export const DownloadDicomImage = ({
  order,
  closeMenu,
}: {
  order: IOrderDTO;
  closeMenu: () => void;
}) => {
  const translate = useTranslate();
  const { buttonIsActive, iconColor, handleClickOpenNewTab } = useDownloadDicomImage(
    order,
    closeMenu,
  );
  const handleClick = () => {
    handleClickOpenNewTab();
    closeMenu();
  };
  return (
    <ContextMenuItemShell
      MenuItemProps={{ disabled: !buttonIsActive, onClick: handleClick }}
      IconComponent={<ItechDownloadIcon fontSize="small" color={iconColor} />}
      MainComponent={<Typography>{translate.buttons.dowloadDicomImage()}</Typography>}
      hotkeyString={HOTKEYS.DOWNLOAD_DICOM_IMAGE.title}
    />
  );
};

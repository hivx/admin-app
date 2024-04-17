import { Typography } from '@mui/material';
import React, { FC } from 'react';

import { ItechMergeStudyIcon } from '@/assets/icon';
import { ContextMenuItemShell } from '@/components/Menu/ContextMenuItemShell';
import { HOTKEYS } from '@/config';
import { useTranslate } from '@/hooks';
import { useMergeStudyButton } from '@/hooks/order/useMergeStudyButton';

import { ExaminationRightClickMenuItemProps } from './ExaminationRightClickMenu';

export const MergeStudyMenuItem: FC<ExaminationRightClickMenuItemProps> = ({
  closeMenu,
  order,
}) => {
  const translate = useTranslate();
  const { buttonIsActive, openMergeStudyModal } = useMergeStudyButton(order);

  const handleOnClick = () => {
    closeMenu();
    openMergeStudyModal();
  };

  return (
    <ContextMenuItemShell
      MenuItemProps={{
        disabled: !buttonIsActive,
        onClick: handleOnClick,
      }}
      IconComponent={<ItechMergeStudyIcon fontSize="small" />}
      MainComponent={
        <Typography>{translate.resources.study.mergeStudyInfo()}</Typography>
      }
      hotkeyString={HOTKEYS.MERGE_STUDY.title}
    />
  );
};

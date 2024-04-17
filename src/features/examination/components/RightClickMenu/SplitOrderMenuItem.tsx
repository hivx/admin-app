import { Typography } from '@mui/material';
import React, { FC } from 'react';

import ItechSplitStudyIcon from '@/assets/icon/SplitStudyIcon';
import { ContextMenuItemShell } from '@/components/Menu/ContextMenuItemShell';
import { useTranslate } from '@/hooks';
import { useSplitOrder } from '@/hooks/examination/useSplitOrder';

import { ExaminationRightClickMenuItemProps } from './ExaminationRightClickMenu';

export const SplitOrderMenuItem: FC<ExaminationRightClickMenuItemProps> = ({
  closeMenu,
  order,
}) => {
  const translate = useTranslate();
  const { onClick, orderCanSplit } = useSplitOrder({ order });
  return (
    <ContextMenuItemShell
      MenuItemProps={{
        disabled: !orderCanSplit,
        onClick: () => {
          onClick();
          closeMenu();
        },
      }}
      IconComponent={<ItechSplitStudyIcon fontSize="small" />}
      MainComponent={
        <Typography>{translate.resources.study.splitStudyOrder()}</Typography>
      }
      hotkeyString="Alt + Z"
    />
  );
};

import { FastRewind } from '@mui/icons-material';
import React from 'react';

import { IconButtonWithToolTip } from '@/components/Elements/Buttons/IconButtonWithToolTip';
import { TableActionButtonsShell } from '@/components/Table/TableActionButtonsShell';
import { useTranslate } from '@/hooks';

import { useButtonChangeWeek } from '../../hook/useButtonChangeWeek';

export const LeftIcon = () => {
  const translate = useTranslate();
  const { onPreviousWeek } = useButtonChangeWeek();

  return (
    <TableActionButtonsShell
      ActionsButton={
        <IconButtonWithToolTip
          title={translate.resources.timetable.previousWeek()}
          onClick={() => onPreviousWeek()}
          color="primary"
        >
          <FastRewind />
        </IconButtonWithToolTip>
      }
    />
  );
};

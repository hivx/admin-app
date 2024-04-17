import { FastForward } from '@mui/icons-material';
import React from 'react';

import { IconButtonWithToolTip } from '@/components/Elements/Buttons/IconButtonWithToolTip';
import { TableActionButtonsShell } from '@/components/Table/TableActionButtonsShell';
import { useTranslate } from '@/hooks';

import { useButtonChangeWeek } from '../../hook/useButtonChangeWeek';

export const RightIcon = () => {
  const translate = useTranslate();
  const { onFowardWeek } = useButtonChangeWeek();
  return (
    <div>
      <TableActionButtonsShell
        ActionsButton={
          <IconButtonWithToolTip
            title={translate.resources.timetable.nextWeek()}
            onClick={() => onFowardWeek()}
            color="primary"
          >
            <FastForward />
          </IconButtonWithToolTip>
        }
      />
    </div>
  );
};

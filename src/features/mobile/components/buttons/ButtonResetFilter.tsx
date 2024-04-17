import SyncIcon from '@mui/icons-material/Sync';
import React from 'react';

import { IconButtonWithToolTip } from '@/components/Elements/Buttons/IconButtonWithToolTip';
import { TableSVGIcon } from '@/components/Table/TableSVGIcon';

export const ButtonResetFilter = ({ onReset }: { onReset: () => void }) => {
  return (
    <IconButtonWithToolTip onClick={onReset} size="medium">
      <TableSVGIcon IconComponent={() => <SyncIcon />} />
    </IconButtonWithToolTip>
  );
};

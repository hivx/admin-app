import TuneIcon from '@mui/icons-material/Tune';
import React from 'react';

import { IconButtonWithToolTip } from '@/components/Elements/Buttons/IconButtonWithToolTip';
import { TableSVGIcon } from '@/components/Table/TableSVGIcon';
import { useDisclosure } from '@/hooks';

import { MobileAdvanceFilter } from '../order/filter/MobileAdvanceFilter';

export const ButtonAdvanceFilter = ({
  disclosure,
}: {
  disclosure: ReturnType<typeof useDisclosure>;
}) => {
  return (
    <>
      <IconButtonWithToolTip onClick={disclosure.open} size="medium">
        <TableSVGIcon IconComponent={() => <TuneIcon />} />
      </IconButtonWithToolTip>
      <MobileAdvanceFilter disclosure={disclosure} />
    </>
  );
};

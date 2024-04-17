import React from 'react';

import { ItechDefaultConfigRadiologyIcon } from '@/assets/icon';
import { IconButtonWithToolTip } from '@/components/Elements/Buttons/IconButtonWithToolTip';
import { TableSVGIcon } from '@/components/Table/TableSVGIcon';

import { useRadiologyReportFunctions } from '../../../providers';
import { DefaultInfoRadiologyModal } from '../Modal/DefaultInfoRadiologyModal/Index';

export const DefaultInfoRadiologyButton = () => {
  const radiologyReportFunc = useRadiologyReportFunctions();
  return (
    <>
      <IconButtonWithToolTip
        title={'Cấu hình đọc ca'}
        onClick={() =>
          radiologyReportFunc.openModalDefaultInfoRadiology &&
          radiologyReportFunc.openModalDefaultInfoRadiology()
        }
        disabled={false}
      >
        <TableSVGIcon IconComponent={ItechDefaultConfigRadiologyIcon} />
      </IconButtonWithToolTip>
      <DefaultInfoRadiologyModal />
    </>
  );
};

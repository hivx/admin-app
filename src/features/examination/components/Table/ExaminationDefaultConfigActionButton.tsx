import React from 'react';

import { ItechDefaultConfigRadiologyIcon } from '@/assets/icon';
import { IconButtonWithToolTip } from '@/components/Elements/Buttons/IconButtonWithToolTip';
import { TableSVGIcon } from '@/components/Table/TableSVGIcon';
import { useTranslate } from '@/hooks';
import { useOrderListFunctions } from '@/providers/Order/OrderListFunctionsProvider';

import { ExaminationDefaultConfigModal } from '../Modal/ExaminationDefaultConfigModal/ExaminationDefaultConfigModal';

export const ExaminationDefaultConfigActionButton = () => {
  const translate = useTranslate();
  const orderListFunctions = useOrderListFunctions();
  return (
    <>
      <IconButtonWithToolTip
        title={translate.resources.order.infomationOrderDefault()}
        onClick={() => {
          orderListFunctions.openConfigRequestModal();
        }}
        disabled={false}
      >
        <TableSVGIcon IconComponent={ItechDefaultConfigRadiologyIcon} />
      </IconButtonWithToolTip>
      <ExaminationDefaultConfigModal />
    </>
  );
};

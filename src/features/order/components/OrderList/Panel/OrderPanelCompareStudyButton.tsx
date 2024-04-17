import React from 'react';

import { ItechCompareImageIcon } from '@/assets/icon';
import { IconButtonWithToolTip } from '@/components/Elements/Buttons/IconButtonWithToolTip';
import { TableSVGIcon } from '@/components/Table/TableSVGIcon';
import { useTranslate } from '@/hooks';
import { BUTTON_STATE } from '@/types';

import { useCompareStudyButton } from '../../../../order/hooks/useCompareStudyButton';

const OrderPanelCompareStudyButton = () => {
  const translate = useTranslate();
  const { buttonState: compareStudyButtonState, openInNewTab } = useCompareStudyButton();
  const isActive = compareStudyButtonState === BUTTON_STATE.ACTIVE;
  const iconColor = isActive ? 'action' : 'disabled';
  return (
    <IconButtonWithToolTip
      title={translate.buttons.dicomCompare()}
      onClick={() => {
        openInNewTab();
      }}
      disabled={compareStudyButtonState === BUTTON_STATE.DISABLED}
    >
      <TableSVGIcon
        IconComponent={ItechCompareImageIcon}
        IconComponentProps={{ color: iconColor }}
      />
    </IconButtonWithToolTip>
  );
};

export default OrderPanelCompareStudyButton;

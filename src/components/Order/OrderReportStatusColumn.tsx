import { Stack } from '@mui/material';
import React from 'react';

import { useTranslate } from '@/hooks';
import { ORDER_DIAGNOSIS_STEP_STATUS } from '@/types/dto';

import {
  ItechApproveIcon,
  ItechNotReadyIcon,
  ItechNotStartedIcon,
  ItechPendingApproveIcon,
} from '../../assets/icon';
import { MyTooltip } from '../Elements/Tooltip/MyTooltip';

const ICON_SIZE = '0.9rem';

export const OrderReportStatusColumn = ({
  status,
}: {
  status: `${ORDER_DIAGNOSIS_STEP_STATUS}`;
}) => {
  const translate = useTranslate();
  const StatusIcon = (status: `${ORDER_DIAGNOSIS_STEP_STATUS}`) => {
    switch (status) {
      case 'NOT_READY':
        return <ItechNotReadyIcon sx={{ fontSize: ICON_SIZE }} />;
      case 'APPROVED':
        return <ItechApproveIcon sx={{ fontSize: ICON_SIZE }} opacity={'80%'} />;
      case 'NOT_STARTED':
        return <ItechNotStartedIcon sx={{ fontSize: ICON_SIZE }} />;
      case 'PENDING_APPROVAL':
        return <ItechPendingApproveIcon sx={{ fontSize: ICON_SIZE }} />;
    }
  };
  return (
    <MyTooltip
      title={translate.resources.order.reportStatusMessage({
        status: status,
      })}
    >
      <Stack alignItems={'center'}> {StatusIcon(status)}</Stack>
    </MyTooltip>
  );
};

import React from 'react';

import { ItechHisIcon } from '@/assets/icon';
import { IconButtonWithToolTip } from '@/components/Elements/Buttons/IconButtonWithToolTip';
import { useTranslate } from '@/hooks';
import { HIS_REPORT_STATUS_TYPE } from '@/types/dto';

export const HisReportStatusInfo = ({
  status,
}: {
  status: `${HIS_REPORT_STATUS_TYPE}`;
}) => {
  const translate = useTranslate();
  const StatusIcon = (status: `${HIS_REPORT_STATUS_TYPE}`) => {
    switch (status) {
      case 'NOT_READY':
        return <ItechHisIcon sx={{ color: '#2957A4' }} />;
      case 'HIS_ORDER_PAID':
      case 'HIS_ORDER_CANCELED':
      case 'HIS_ORDER_NOT_ALLOWED':
      case 'HIS_NOT_SYNC_MODALITIES':
      case 'HIS_CONNECT_TIME_OUT':
      case 'HIS_UNKNOWN_ERROR':
      case 'CONN_ERROR':
        return <ItechHisIcon color="error" />;
      case 'SENDING':
        return <ItechHisIcon sx={{ color: '#ED6C02' }} color="error" />;
      case 'SUCCEEDED':
        return <></>;
    }
  };
  return (
    <IconButtonWithToolTip
      title={translate.resources.order.hisReportStatusMessage({
        status: status,
      })}
      onClick={() => {}}
      disabled
    >
      {StatusIcon(status)}
    </IconButtonWithToolTip>
  );
};

import { Typography } from '@mui/material';
import React from 'react';

import { useTranslate } from '@/hooks';
import { getPatientAge } from '@/lib/dataHelper/radiologyReport/getPatientAge';
import { IOrderDTO } from '@/types/dto';

export const PatientInfomation = ({ order }: { order?: IOrderDTO }) => {
  const translate = useTranslate();
  return (
    <Typography>
      {translate.pages.orderList.orderPanelTitle({
        patientAge: getPatientAge(order?.patient?.birthDate).toString(),
        patientName: order?.patient?.fullname ?? '',
        pid: order?.patient?.pid ?? '',
      })}
    </Typography>
  );
};

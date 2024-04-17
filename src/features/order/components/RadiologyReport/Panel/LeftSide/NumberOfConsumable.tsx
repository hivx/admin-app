import { Typography } from '@mui/material';
import React, { FC } from 'react';

import { useAppSelector } from '@/hooks';
import {
  IOrderReportKey,
  selectRadiologyReportConsumables,
} from '@/stores/OrderRadiology';

export const NumberOfConsumable: FC<IOrderReportKey> = ({ orderID, requestID }) => {
  const consumablesFromStore = useAppSelector(
    selectRadiologyReportConsumables({ orderID, requestID }),
  );

  const numberFromStore =
    consumablesFromStore
      ?.map((item) => item.quantity ?? 0)
      .reduce((partialSum, a) => partialSum + a, 0) ?? 0;

  const sum = numberFromStore;

  return <Typography>Tổng số vật tư: {sum}</Typography>;
};

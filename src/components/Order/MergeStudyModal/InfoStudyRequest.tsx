import { Stack, Typography } from '@mui/material';
import React, { FC } from 'react';

import { useAppSelector, useTranslate } from '@/hooks';
import { TABLE_ORDER_MERGE_STUDY } from '@/stores/table/tableInitialState';
import { getCurrentSelectedRow } from '@/stores/table/tableSelectors';
import { IOrderDTO } from '@/types/dto';

import InfoStudyFields from './InfoStudyFields';

const InfoStudyRequest: FC = () => {
  const rowSelected = useAppSelector(
    getCurrentSelectedRow<IOrderDTO>(TABLE_ORDER_MERGE_STUDY),
  );

  const translate = useTranslate();
  return (
    <Stack spacing={1}>
      <Typography variant="body2">
        {translate.resources.order.mergeOrder.infoStudyDicomOrder().toUpperCase()}
      </Typography>
      <InfoStudyFields study={rowSelected?.study} />
    </Stack>
  );
};

export default InfoStudyRequest;

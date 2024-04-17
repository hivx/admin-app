import { Typography } from '@mui/material';
import React, { FC } from 'react';

import { useTranslate } from '@/hooks';
import { IOrderDTO } from '@/types/dto';

import InfoShell from './InfoShell';
import InfoStudyFields from './InfoStudyFields';

type InfoNeedMergeProps = {
  study?: IOrderDTO['study'];
};
/**
 * THÔNG TIN STUDY
 */
const InfoNeedMerge: FC<InfoNeedMergeProps> = (props) => {
  const { study } = props;
  const translate = useTranslate();
  return (
    <InfoShell
      Title={
        <Typography>
          {translate.resources.order.mergeOrder.infoStudyNeedMerge().toUpperCase()}
        </Typography>
      }
      Content={<InfoStudyFields study={study} />}
    />
  );
};

export default InfoNeedMerge;

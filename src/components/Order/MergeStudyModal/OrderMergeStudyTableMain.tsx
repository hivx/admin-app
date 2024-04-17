import { styled, Typography } from '@mui/material';
import React, { FC } from 'react';

import { useTranslate } from '@/hooks';
import { IOrderDTO } from '@/types/dto';

import { ConnectedOrderMergeStudyTable } from './OrderMergeStudyTable';
type OrderMergeStudyTableMain = {
  order?: IOrderDTO;
};
/**
 * TABLE TÌM KIẾM CHỈ ĐỊNH
 */
const OrderMergeStudyTableMain: FC<OrderMergeStudyTableMain> = (props) => {
  const { order } = props;
  const translate = useTranslate();
  return (
    <StyledOrderMergeStudyTableMain>
      <Typography>
        {translate.resources.order.mergeOrder.searchOrder().toUpperCase()}
      </Typography>
      <ConnectedOrderMergeStudyTable order={order} />
    </StyledOrderMergeStudyTableMain>
  );
};

export default OrderMergeStudyTableMain;
const StyledOrderMergeStudyTableMain = styled('div')`
  display: grid;
  grid-template-rows: auto 1fr;
  overflow: auto;
  table {
    tbody {
      tr {
        td {
          text-align: center;
        }
      }
    }
  }
`;

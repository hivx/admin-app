import React, { FC } from 'react';

import { IOrderDTO, IOrderRequestDTO } from '@/types/dto';

import { ConsumableDynamicPanelTable } from './ConsumableDynamicPanelTable';

type ConsumableDynamicPanelProps = {
  order?: IOrderDTO;
  request?: IOrderRequestDTO;
};
export const ConsumableDynamicPanel: FC<ConsumableDynamicPanelProps> = (props) => {
  return <ConsumableDynamicPanelTable requestID={props.request?.id} />;
};

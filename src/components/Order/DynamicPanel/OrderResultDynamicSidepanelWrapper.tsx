import React from 'react';

import { useAppSelector } from '@/hooks';
import { TABLE_RESULT } from '@/stores/table/tableInitialState';
import { getCurrentSelectedRow } from '@/stores/table/tableSelectors';
import { IOrderDTO } from '@/types/dto';

import { OrderResultDynamicSidepanel } from './OrderResultDynamicSidepanel';
//When record (row table) change we need to re-render side panel. This component prepare record if record change will re-render sidepanel, avoid the whole page being re-render

const OrderResultDynamicSidepanelWrapper = () => {
  const record = useAppSelector(getCurrentSelectedRow<IOrderDTO>(TABLE_RESULT));

  return <OrderResultDynamicSidepanel key={record?.id} order={record} />;
};

export default OrderResultDynamicSidepanelWrapper;

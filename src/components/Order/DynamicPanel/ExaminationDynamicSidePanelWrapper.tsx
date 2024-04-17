import React from 'react';

import { ExaminationDynamicSidePanel } from '@/components/Order/DynamicPanel/ExaminationDynamicSidePanel';
import { useAppSelector } from '@/hooks';
import { TABLE_EXAMINATION } from '@/stores/table/tableInitialState';
import { getCurrentSelectedRow } from '@/stores/table/tableSelectors';
import { IOrderDTO } from '@/types/dto';

//When record (row table) change we need to re-render side panel. This component prepare record if record change will re-render sidepanel, avoid the whole page being re-render
const ExaminationDynamicSidePanelWrapper = () => {
  const record = useAppSelector(getCurrentSelectedRow<IOrderDTO>(TABLE_EXAMINATION));
  return <ExaminationDynamicSidePanel key={record?.id} order={record} />;
};

export default ExaminationDynamicSidePanelWrapper;

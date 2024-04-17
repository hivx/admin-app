import { styled } from '@mui/material';
import { FC } from 'react';

import { useOrderDynamicSidepanelData } from '@/hooks/dynamicSidepanelDataController/useOrderDynamicSidepanelData';
import { IOrderDTO } from '@/types/dto';

import { StudyHistoryTable } from './StudyHistoryTable';
import { StudyHistoryTableShell } from './StudyHistoryTableShell';

type StudyHistoryProps = {
  order?: IOrderDTO;
  onOrderChanged?: ReturnType<typeof useOrderDynamicSidepanelData>['onOrderChanged'];
};
export const StudyHistory: FC<StudyHistoryProps> = (props) => {
  return (
    <StudyHistoryContainer>
      <StudyHistoryTableShell TableComponent={<StudyHistoryTable {...props} />} />
    </StudyHistoryContainer>
  );
};

/**
 * Styles
 */

const StudyHistoryContainer = styled('div')`
  width: 100%;
  height: 100%;
`;

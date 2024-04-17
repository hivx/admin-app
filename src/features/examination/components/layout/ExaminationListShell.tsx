import { Stack, styled } from '@mui/material';
import { FC, ReactNode } from 'react';

import { StyledTableContainerWithCollapsiblePanel } from '@/components/Table/MyTable.styles';

type ExaminationListShellProps = {
  TableComponent: ReactNode;
};

export const ExaminationListShell: FC<ExaminationListShellProps> = (props) => {
  const { TableComponent } = props;
  return (
    <StyledExaminationListShell>
      <StyledTableContainerWithCollapsiblePanel>
        <Stack height="100%" overflow="hidden" spacing={2}>
          {TableComponent}
        </Stack>
      </StyledTableContainerWithCollapsiblePanel>
    </StyledExaminationListShell>
  );
};

const StyledExaminationListShell = styled('div')`
  display: flex;
  width: 100%;
  height: 100%;
  max-height: 100%;
  overflow: hidden;
  /* padding: ${(props) => props.theme.spacing(1)}; */
  padding-bottom: 0;
`;

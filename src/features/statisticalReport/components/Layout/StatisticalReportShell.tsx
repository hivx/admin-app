import { Stack, styled } from '@mui/material';
import { FC, ReactNode } from 'react';

import { StyledTableContainerWithCollapsiblePanel } from '@/components/Table/MyTable.styles';

type StatisticalReportShellProps = {
  PdfComponent: ReactNode;
};

export const StatisticalReportShell: FC<StatisticalReportShellProps> = (props) => {
  const { PdfComponent } = props;
  return (
    <StyledStatisticalReportShell>
      <StyledTableContainerWithCollapsiblePanel>
        <Stack height="100%" overflow="hidden" spacing={2}>
          {PdfComponent}
        </Stack>
      </StyledTableContainerWithCollapsiblePanel>
    </StyledStatisticalReportShell>
  );
};

const StyledStatisticalReportShell = styled('div')`
  display: flex;
  width: 100%;
  height: 100%;
  max-height: 100%;
  overflow: hidden;
  /* padding: ${(props) => props.theme.spacing(1)}; */
  padding-bottom: 0;
`;

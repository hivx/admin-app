import { styled } from '@mui/material';
import { FC, ReactNode } from 'react';

type RadiologyReportShellProps = {
  ReportPanelComponent: ReactNode;
  DynamicSidePanel: ReactNode;
};
export const RadiologyReportShell: FC<RadiologyReportShellProps> = (props) => {
  const { ReportPanelComponent, DynamicSidePanel } = props;
  return (
    <StyledLayout>
      {ReportPanelComponent}
      {DynamicSidePanel}
    </StyledLayout>
  );
};

const StyledLayout = styled('div')`
  display: grid;
  height: 100%;
  max-height: 100%;
  max-width: 100vw;
  grid-template-columns: 1fr auto;
  overflow: hidden;
  background-color: ${(props) => props.theme.palette.background.paper};
`;

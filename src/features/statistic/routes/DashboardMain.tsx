import { styled } from '@mui/material';

import { useTranslate } from '@/hooks/useTranslate';

import { StatisticLayout } from '../components';
import { SummaryModalityTable } from '../components/SummaryModalityTable';
import { SummaryOrderData } from '../components/SummaryOrderData/SummaryOrderData';
import { SummaryProcedureData } from '../components/SummaryProcedureData/SummaryProcedureData';
import { SummaryRadiologistTable } from '../components/SummaryRadiologistTable';

/**
 * Dashboard page for showing statistic data
 */
export const DashboardMain = () => {
  const translate = useTranslate();

  return (
    <StatisticLayout title={translate.pages.statistic.header()}>
      <StyledDashboardContainer>
        <StyledDashboardItem>
          <SummaryProcedureData />
        </StyledDashboardItem>
        <StyledDashboardItem>
          <SummaryOrderData />
        </StyledDashboardItem>
        <StyledDashboardItem>
          <SummaryRadiologistTable />
        </StyledDashboardItem>
        <StyledDashboardItem>
          <SummaryModalityTable />
        </StyledDashboardItem>
      </StyledDashboardContainer>
    </StatisticLayout>
  );
};

export const StyledDashboardContainer = styled('div')`
  --gap: ${(props) => props.theme.spacing(4)};
  --padding: ${(props) => props.theme.spacing(1)};
  display: grid;
  width: 100%;
  height: 100%;
  max-width: 100vw;
  grid-template-columns: repeat(auto-fit, calc(50vw - var(--gap)));
  grid-template-rows: repeat(auto-fit, calc(50vh - var(--gap)));
  gap: var(--gap);
  padding: var(--padding);
  justify-content: center;

  ${(props) => props.theme.breakpoints.down('lg')} {
    grid-template-columns: auto;
    grid-template-rows: repeat(auto-fit, calc(100vh - var(--gap)));
  }
`;

export const StyledDashboardItem = styled('div')`
  max-height: 100%;
  max-width: 100%;
  width: 100%;
  height: 100%;
`;

import React from 'react';

import { NavBarLayout } from '@/components/Layout/NavBarLayout';
import { useTranslate } from '@/hooks';

import { StyledDashboardContainer, StyledDashboardItem } from './DashboardTab';
import { StatisticLayout } from './StatisticLayout';
import { SummaryModalityTable } from './SummaryModalityTable';
import { SummaryOrderData } from './SummaryOrderData/SummaryOrderData';
import { SummaryProcedureData } from './SummaryProcedureData/SummaryProcedureData';
import { SummaryRadiologistTable } from './SummaryRadiologistTable';

/**
 * Dashboard modules
 */

export const DashboardModule = () => {
  const translate = useTranslate();
  return (
    <NavBarLayout>
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
    </NavBarLayout>
  );
};

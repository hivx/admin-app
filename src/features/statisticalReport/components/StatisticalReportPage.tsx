import React from 'react';

import { useTranslate } from '@/hooks';

import { StatisticalReportLayout } from './Layout/StatisticalReportLayout';
import { StatisticalReportShell } from './Layout/StatisticalReportShell';
import { StatisticalReportSidebar } from './Sidebar/StatisticalReportSidebar';
import StatisticReportContent from './StatisticReportContent';

export const StatisticalReportPage = () => {
  const translate = useTranslate();
  return (
    <StatisticalReportLayout title={translate.pages.examinationList.title()}>
      <StatisticalReportSidebar />
      <StatisticalReportShell PdfComponent={<StatisticReportContent />} />
    </StatisticalReportLayout>
  );
};

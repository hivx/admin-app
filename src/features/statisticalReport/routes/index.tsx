import { RouteObject, useRoutes } from 'react-router-dom';

import { NavBarLayout } from '@/components/Layout/NavBarLayout';

import { StatisticalReportPage } from '../components/StatisticalReportPage';

import { StatisticalReportPaths } from './paths';

export const StatisticalReportRoutes = () => {
  const statisticalReportPage = useRoutes(statisticalReportRoutes);
  return <NavBarLayout>{statisticalReportPage}</NavBarLayout>;
};

const statisticalReportRoutes: RouteObject[] = [
  {
    path: StatisticalReportPaths.Base,
    element: <StatisticalReportPage />,
  },
];

export * from './paths';

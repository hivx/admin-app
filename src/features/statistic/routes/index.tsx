import { RouteObject, useRoutes } from 'react-router-dom';

import { DashboardModule } from '../components/DashboardModule';
import { DashboardTab } from '../components/DashboardTab';

import { StatisticPaths } from './paths';

export const StatisticRoutes = () => {
  const statisticPage = useRoutes(statisticRoutes);
  return <>{statisticPage}</>;
};

const statisticRoutes: RouteObject[] = [
  {
    path: StatisticPaths.Tab,
    element: <DashboardTab />,
  },
  {
    path: StatisticPaths.Base,
    element: <DashboardModule />,
  },
];

export * from './paths';

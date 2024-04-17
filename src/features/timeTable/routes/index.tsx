import { RouteObject, useRoutes } from 'react-router-dom';

import { lazyImport } from '@/utils/lazyImport';

import { TimeTablePaths } from './paths';

export const TimeTableRoutes = () => {
  const elements = useRoutes(timeTableRoutes);
  return <>{elements}</>;
};

const { TimeTableList } = lazyImport(() => import('./TimeTableList'), 'TimeTableList');

const timeTableRoutes: RouteObject[] = [
  {
    path: TimeTablePaths.Base,
    element: <TimeTableList />,
  },
];

export * from './paths';

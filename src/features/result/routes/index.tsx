import { RouteObject, useRoutes } from 'react-router-dom';

import { lazyImport } from '@/utils/lazyImport';

import { ResultListPaths } from './paths';

export const ResultListRoutes = () => {
  const elements = useRoutes(resultListRoutes);
  return <>{elements}</>;
};

const { ResultList } = lazyImport(() => import('./ResultList'), 'ResultList');

const resultListRoutes: RouteObject[] = [
  {
    path: ResultListPaths.Base,
    element: <ResultList />,
  },
];

export * from './paths';

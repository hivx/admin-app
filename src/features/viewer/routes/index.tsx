import { RouteObject, useRoutes } from 'react-router-dom';

import { lazyImport } from '@/utils/lazyImport';

import { VIEWER_PATH } from './paths';

export const ViewerRoutes = () => {
  const elements = useRoutes(viewerRoutes);
  return <>{elements}</>;
};

const { ViewerBasePage } = lazyImport(() => import('./ViewerBasePage'), 'ViewerBasePage');

const viewerRoutes: RouteObject[] = [
  {
    path: VIEWER_PATH.BASE,
    element: <ViewerBasePage />,
  },
];

export * from './paths';

import { RouteObject } from 'react-router-dom';

import { ROUTE_AUTH } from '@/features/auth';
import { ROUTE_VIEWER, ViewerRoutes } from '@/features/viewer';
import { lazyImport } from '@/utils/lazyImport';

const { AuthRoutes } = lazyImport(() => import('@/features/auth'), 'AuthRoutes');

export const publicRoutes: RouteObject[] = [
  {
    path: `${ROUTE_AUTH}/*`,
    element: <AuthRoutes />,
  },
  { path: `${ROUTE_VIEWER}/*`, element: <ViewerRoutes /> },
];

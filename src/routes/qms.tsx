import { RouteObject } from 'react-router-dom';

import { ROUTE_QMS } from '@/features/qms';
import { lazyImport } from '@/utils/lazyImport';

const { QmsRoutes } = lazyImport(() => import('@/features/qms'), 'QmsRoutes');

export const qmsRoutes: RouteObject[] = [
  {
    path: `${ROUTE_QMS}/*`,
    element: <QmsRoutes />,
  },
];

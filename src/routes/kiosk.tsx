import { RouteObject } from 'react-router-dom';

import { ROUTE_KIOSK } from '@/features/kiosk';
import { lazyImport } from '@/utils/lazyImport';

const { KioskRoutes } = lazyImport(() => import('@/features/kiosk'), 'KioskRoutes');

export const kioskRoutes: RouteObject[] = [
  {
    path: `${ROUTE_KIOSK}/*`,
    element: <KioskRoutes />,
  },
];

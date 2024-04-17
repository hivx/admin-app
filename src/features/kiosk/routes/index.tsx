import { ThemeProvider } from '@mui/material';
import { RouteObject, useRoutes } from 'react-router-dom';

import { qmsTheme } from '@/features/qms';
import { SyncServerTime } from '@/providers/SyncServerTime';
import { lazyImport } from '@/utils/lazyImport';

import { KioskPath } from './paths';

export const KioskRoutes = () => {
  const elements = useRoutes(kioskListRoutes);
  return (
    <ThemeProvider theme={qmsTheme}>
      <SyncServerTime>{elements}</SyncServerTime>
    </ThemeProvider>
  );
};

const { KioskMain } = lazyImport(
  () => import('../components/Kiosk/KioskMain'),
  'KioskMain',
);

const kioskListRoutes: RouteObject[] = [
  {
    path: `${KioskPath.Base}/:site`,
    element: <KioskMain />,
  },
];

export * from './paths';

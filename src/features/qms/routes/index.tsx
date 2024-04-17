import { ThemeProvider } from '@mui/material';
import { RouteObject, useRoutes } from 'react-router-dom';

import { SyncServerTime } from '@/providers/SyncServerTime';
import { lazyImport } from '@/utils/lazyImport';

import { qmsTheme } from '../configs/qmsTheme';

import { QMSPath } from './paths';

export const QmsRoutes = () => {
  const elements = useRoutes(qmsListRoutes);

  return (
    <ThemeProvider theme={qmsTheme}>
      <SyncServerTime>{elements}</SyncServerTime>
    </ThemeProvider>
  );
};
const { Test } = lazyImport(() => import('../components/Test'), 'Test');
const { Reception } = lazyImport(
  () => import('../components/Reception/Reception'),
  'Reception',
);

const { PatientWaitingScreen } = lazyImport(
  () => import('../components/Patient/PatientWaitingScreen'),
  'PatientWaitingScreen',
);

const { WaitingList } = lazyImport(
  () => import('../components/WaitingList/WaitingList'),
  'WaitingList',
);

const { TicketMain } = lazyImport(
  () => import('../components/Ticket/TicketMain'),
  'TicketMain',
);

const { MainSpeakerQueue } = lazyImport(
  () => import('../components/SpeakerQueue/MainSpeakerQueue'),
  'MainSpeakerQueue',
);

const { MainSummary } = lazyImport(
  () => import('../components/Summary/MainSummary'),
  'MainSummary',
);

const qmsListRoutes: RouteObject[] = [
  {
    path: `${QMSPath.Test}/*`,
    element: <Test />,
  },
  {
    path: `${QMSPath.Reception}/:site`,
    element: <Reception />,
  },
  {
    path: `${QMSPath.Ticket}`,
    element: <TicketMain />,
  },
  {
    path: `${QMSPath.PatientWatingScreen}/:modalityID`,
    element: <PatientWaitingScreen />,
  },
  {
    path: `${QMSPath.WaitingList}`,
    element: <WaitingList />,
  },
  {
    path: `${QMSPath.SpeakerQueue}/:speaker`,
    element: <MainSpeakerQueue />,
  },
  {
    path: `${QMSPath.Summary}/:site`,
    element: <MainSummary />,
  },
];

export * from './paths';

import { Suspense } from 'react';
import { Outlet, RouteObject } from 'react-router-dom';

import { FullPageSpinner } from '@/components/Layout/FullPageSpinner';
import { ROUTE_ADMIN } from '@/features/admin';
import { LoginGuard } from '@/features/auth';
import { ROUTE_TEMPLATE } from '@/features/contentTemplate';
import { ROUTE_DOWNLOAD } from '@/features/dowloadDicom';
import { ROUTE_EXAMINATION_LIST } from '@/features/examination';
import { ROUTE_MOBILE } from '@/features/mobile';
import { ROUTE_ORDER_LIST } from '@/features/order';
import { ROUTE_REDIRECT_PAGE } from '@/features/redirect';
import { ROUTE_REGISTRATION_LIST } from '@/features/registrationList';
import { ROUTE_RESULT_LIST } from '@/features/result';
import { ROUTE_STATISTIC } from '@/features/statistic';
import { ROUTE_STATISTICAL_REPORT } from '@/features/statisticalReport';
import { TIMETABLE_LIST } from '@/features/timeTable';
import { SyncServerTime } from '@/providers/SyncServerTime';
import { lazyImport } from '@/utils/lazyImport';

const App = () => {
  return (
    <LoginGuard>
      <SyncServerTime>
        <Suspense fallback={<FullPageSpinner />}>
          <Outlet />
        </Suspense>
      </SyncServerTime>
    </LoginGuard>
  );
};

// const TestHomePage: FC = () => {
//   const notifyModal = useNotifyModal();
//   const notifySnackbar = useNotifySnackbar();
//   return (
//     <NavBarLayout>
//       <Button
//         onClick={() => {
//           notifyModal({
//             message: 'Test modal',
//           });
//         }}
//         variant="outlined"
//       >
//         Modal
//       </Button>
//       <Button
//         onClick={() => {
//           notifySnackbar({
//             message: 'Test snackbar',
//           });
//         }}
//         variant="outlined"
//       >
//         Snackbar
//       </Button>
//     </NavBarLayout>
//   );
// };

const { OrderListRoutes } = lazyImport(
  () => import('@/features/order'),
  'OrderListRoutes',
);

const { RegistrationListRoutes } = lazyImport(
  () => import('@/features/registrationList'),
  'RegistrationListRoutes',
);

const { DownloadDicomRoutes } = lazyImport(
  () => import('@/features/dowloadDicom/routes'),
  'DownloadDicomRoutes',
);

const { AdminRoutes } = lazyImport(() => import('@/features/admin'), 'AdminRoutes');

const { ResultListRoutes } = lazyImport(
  () => import('@/features/result'),
  'ResultListRoutes',
);

const { StatisticRoutes } = lazyImport(
  () => import('@/features/statistic'),
  'StatisticRoutes',
);

const { StatisticalReportRoutes } = lazyImport(
  () => import('@/features/statisticalReport'),
  'StatisticalReportRoutes',
);

const { Redirect } = lazyImport(
  () => import('@/features/redirect/components'),
  'Redirect',
);

const { MobileRoutes } = lazyImport(
  () => import('@/features/mobile/routes'),
  'MobileRoutes',
);

const { ExaminationRoutes } = lazyImport(
  () => import('@/features/examination'),
  'ExaminationRoutes',
);

const { TimeTableRoutes } = lazyImport(
  () => import('@/features/timeTable'),
  'TimeTableRoutes',
);

const { TemplateRoutes } = lazyImport(
  () => import('@/features/contentTemplate'),
  'TemplateRoutes',
);
/**
 * common to both mobileRoutes and desktopRoutes
 */
const redirectRoutes: RouteObject[] = [
  { path: '/', element: <Redirect /> },
  { path: `${ROUTE_REDIRECT_PAGE}`, element: <Redirect /> },
  { path: '*', element: <Redirect /> },
];

/**
 * All route for mobile device
 */
const mobileRoutes: RouteObject[] = [
  ...redirectRoutes,
  { path: `${ROUTE_MOBILE}/*`, element: <MobileRoutes /> },
];

/**
 * All route with modules for desktop device
 */
const desktopRoutes: RouteObject[] = [
  ...redirectRoutes,
  { path: `${ROUTE_ORDER_LIST}/*`, element: <OrderListRoutes /> },
  { path: `${ROUTE_REGISTRATION_LIST}/*`, element: <RegistrationListRoutes /> },
  { path: `${ROUTE_ADMIN}/*`, element: <AdminRoutes /> },
  { path: `${ROUTE_RESULT_LIST}/*`, element: <ResultListRoutes /> },
  { path: `${ROUTE_STATISTIC}/*`, element: <StatisticRoutes /> },
  { path: `${ROUTE_STATISTICAL_REPORT}/*`, element: <StatisticalReportRoutes /> },
  { path: `${ROUTE_EXAMINATION_LIST}/*`, element: <ExaminationRoutes /> },
  { path: `${ROUTE_DOWNLOAD}/:studyID`, element: <DownloadDicomRoutes /> },
  { path: `${TIMETABLE_LIST}/*`, element: <TimeTableRoutes /> },
  { path: `${ROUTE_TEMPLATE}`, element: <TemplateRoutes /> },
];

const mainRoute: RouteObject = {
  path: '/',
  element: <App />,
};

export const protectedDesktopRoutes: RouteObject[] = [
  { ...mainRoute, children: desktopRoutes },
];

export const protectedMobileRoutes: RouteObject[] = [
  { ...mainRoute, children: mobileRoutes },
];

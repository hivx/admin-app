import { RouteObject, useRoutes } from 'react-router-dom';

import { NavBarLayout } from '@/components/Layout/NavBarLayout';
import { lazyImport } from '@/utils/lazyImport';

import { OrderListPaths } from './paths';
import { PatientResultPage } from './PatientResultPage';

export const OrderListRoutes = () => {
  const elements = useRoutes(orderListRoutes);
  return <NavBarLayout>{elements}</NavBarLayout>;
};

const { OrderListPage } = lazyImport(() => import('./OrderListPage'), 'OrderListPage');

const { RadiologyReportPage } = lazyImport(
  () => import('./RadiologyReportPage'),
  'RadiologyReportPage',
);

const orderListRoutes: RouteObject[] = [
  {
    path: OrderListPaths.Base,
    element: <OrderListPage />,
  },
  {
    path: `${OrderListPaths.Base}/:orderID`,
    element: <RadiologyReportPage />,
  },
  {
    path: `${OrderListPaths.MedicalHistory}/:pid`,
    element: <PatientResultPage />,
  },
];

export * from './paths';

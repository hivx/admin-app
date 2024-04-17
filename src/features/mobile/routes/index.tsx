import { RouteObject, useRoutes } from 'react-router-dom';

import { lazyImport } from '@/utils/lazyImport';

import { MobileRadiologyReportPage } from '../components/order/MobileRadiologyReportPage';

import { MobilePaths } from './paths';

export const MobileRoutes = () => {
  const elements = useRoutes(mobileRoutes);
  return <>{elements}</>;
};

/**
 * Component Mobile default redirect
 */
const { MobileMain } = lazyImport(
  () => import('@/features/mobile/components'),
  'MobileMain',
);

/**
 * Component Mobile order list
 */
const { MobileOrderListPage } = lazyImport(
  () => import('@/features/mobile/components'),
  'MobileOrderListPage',
);

/**
 * Component test route mobile
 */
const { TestMobile } = lazyImport(
  () => import('@/features/mobile/components'),
  'TestMobile',
);
export const mobileRoutes: RouteObject[] = [
  {
    path: MobilePaths.Base,
    element: <MobileMain />,
  },
  { path: MobilePaths.OrderList, element: <MobileOrderListPage /> },
  { path: `${MobilePaths.OrderList}/:orderID`, element: <MobileRadiologyReportPage /> },
  { path: '/test', element: <TestMobile /> },
];

export * from './paths';

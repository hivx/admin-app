import { RouteObject, useRoutes } from 'react-router-dom';

import { NavBarLayout } from '@/components/Layout/NavBarLayout';
import { lazyImport } from '@/utils/lazyImport';

export enum registrationListPaths {
  base = '/',
}

const { ExaminationPage } = lazyImport(
  () => import('../components/ExaminationPage'),
  'ExaminationPage',
);

export const ExaminationRoutes = () => {
  const elements = useRoutes(examinationRoutes);
  return <NavBarLayout>{elements}</NavBarLayout>;
};

const examinationRoutes: RouteObject[] = [
  {
    path: registrationListPaths.base,
    element: <ExaminationPage />,
  },
];

export * from './paths';

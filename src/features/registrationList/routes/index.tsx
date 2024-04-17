import { RouteObject, useRoutes } from 'react-router-dom';

import { NavBarLayout } from '@/components/Layout/NavBarLayout';

import { RegistrationList } from './RegistrationList';

export enum registrationListPaths {
  base = '/',
}
export const ROUTE_REGISTRATION_LIST = '/registration-list';

export const RegistrationListRoutes = () => {
  const elements = useRoutes(registrationListRoutes);
  return <NavBarLayout>{elements}</NavBarLayout>;
};

const registrationListRoutes: RouteObject[] = [
  {
    path: registrationListPaths.base,
    element: <RegistrationList />,
  },
];

import { Navigate } from 'react-router-dom';

import { ROUTE_ADMIN_DEPARTMENT } from './paths';
const DEFAULT_REDIRECT = ROUTE_ADMIN_DEPARTMENT;
export const AdminMain = () => {
  return <Navigate to={DEFAULT_REDIRECT} />;
};

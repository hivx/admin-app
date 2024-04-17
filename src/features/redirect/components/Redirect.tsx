import { Navigate } from 'react-router-dom';

import { useModuleRedirect } from '../hook/useModuleRedirect';

import { NotModulesPage } from './NotModulesPage';

/**
 * @returns default access pages by user modules and device
 */
export const Redirect = () => {
  const { exectRouteRedirect } = useModuleRedirect();
  if (exectRouteRedirect) {
    return <Navigate to={exectRouteRedirect} />;
  }
  return <NotModulesPage />;
};

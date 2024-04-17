import { useRoutes } from 'react-router-dom';

import { useDetectMobile } from '@/hooks/useDetectMobile';

import { kioskRoutes } from './kiosk';
import { protectedDesktopRoutes, protectedMobileRoutes } from './protected';
import { publicRoutes } from './public';
import { qmsRoutes } from './qms';

export const AppRoutes = () => {
  const isMobileSize = useDetectMobile();
  /**
   * modules PACS routes by device
   */
  const routesByDevice = isMobileSize ? protectedMobileRoutes : protectedDesktopRoutes;
  const pacsRoutes = [...publicRoutes, ...routesByDevice];
  /**
   * Currently, there are 2 main modules to use:
   * - PACS
   * - QMS
   * Delete the module pacsRoute or qmsRoute AND  imports out to leave it out of the final build
   */
  const element = useRoutes([...pacsRoutes, ...qmsRoutes, ...kioskRoutes]);

  return <>{element}</>;
};

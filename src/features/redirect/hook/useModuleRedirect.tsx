import { ROUTE_MOBILE } from '@/features/mobile';
import { useDetectMobile } from '@/hooks/useDetectMobile';
import { useGetMenuModules } from '@/hooks/useGetUserModules';
/**
 * check modules and device to get route
 * @returns string
 */
export const useModuleRedirect = () => {
  const modules = useGetMenuModules();
  const isMobileSize = useDetectMobile();
  const hasModule = modules.length;

  if (!hasModule) return { exectRouteRedirect: undefined };

  /**
   * if mobile device -> return default mobile route
   * if desktop -> return modules route of user
   */
  const exectRouteRedirect = isMobileSize ? ROUTE_MOBILE : `${modules[0].route}`;

  return { exectRouteRedirect };
};

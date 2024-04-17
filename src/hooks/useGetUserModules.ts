import { getModulesPriorityByUserType } from '@/lib/dataHelper/getModulesPriorityByUserType';
import { moduleToRouteMap } from '@/lib/dataHelper/moduleToRouteMap';
import { useAuth } from '@/providers/AuthProvider';
import { Menu, MenuItem } from '@/types';
import { USER_MODULE } from '@/types/dto';

/**
 * return modules list display on navbar
 */
export const useGetMenuModules = () => {
  const listMenu: MenuItem[] = [];
  const useAuthProvider = useAuth();
  const modules = useAuthProvider.userModules;
  const type = useAuthProvider.user?.type;
  if (!modules) return [];
  getModulesPriorityByUserType(modules, type).forEach((module) => {
    switch (module) {
      case USER_MODULE.ADMINISTRATION:
        listMenu.push({
          name: Menu.ADMIN,
          route: moduleToRouteMap[USER_MODULE.ADMINISTRATION],
        });
        break;
      case USER_MODULE.REPORTING:
        listMenu.push({
          name: Menu.ORDER_LIST,
          route: moduleToRouteMap[USER_MODULE.REPORTING],
        });
        break;
      case USER_MODULE.PUBLICATION:
        listMenu.push({
          name: Menu.RESULT,
          route: moduleToRouteMap[USER_MODULE.PUBLICATION],
        });
        break;
      case USER_MODULE.STATISTICS:
        listMenu.push({
          name: Menu.STATISTICAL_REPORT,
          route: moduleToRouteMap[USER_MODULE.STATISTICS],
        });
        break;
      case USER_MODULE.REGISTRATION:
        listMenu.push({
          name: Menu.REGISTRATION_LIST,
          route: moduleToRouteMap[USER_MODULE.REGISTRATION],
        });
        break;
      case USER_MODULE.EXAMINATION:
        listMenu.push({
          name: Menu.EXAMINATION,
          route: moduleToRouteMap[USER_MODULE.EXAMINATION],
        });
        break;
      case USER_MODULE.SUMMARY:
        listMenu.push({
          name: Menu.SUMMARY,
          route: moduleToRouteMap[USER_MODULE.SUMMARY],
        });
        break;
      case USER_MODULE.TIMETABLE:
        listMenu.push({
          name: Menu.TIMETABLE,
          route: moduleToRouteMap[USER_MODULE.TIMETABLE],
        });
        break;
      case USER_MODULE.TEMPLATE:
        listMenu.push({
          name: Menu.TEMPLATE,
          route: moduleToRouteMap[USER_MODULE.TEMPLATE],
        });
        break;
    }
  });

  return listMenu;
};

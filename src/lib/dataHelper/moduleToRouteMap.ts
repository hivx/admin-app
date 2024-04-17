// map từ module --> route

import { ROUTE_TEMPLATE } from '@/features/contentTemplate';

import { ROUTE_ADMIN } from '../../features/admin/routes/paths';
import { ROUTE_EXAMINATION_LIST } from '../../features/examination/routes/paths';
import { ROUTE_ORDER_LIST } from '../../features/order/routes/paths';
import { ROUTE_REGISTRATION_LIST } from '../../features/registrationList/routes';
import { ROUTE_RESULT_LIST } from '../../features/result/routes/paths';
import { ROUTE_STATISTIC } from '../../features/statistic/routes/paths';
import { ROUTE_STATISTICAL_REPORT } from '../../features/statisticalReport/routes/paths';
import { USER_MODULE } from '../../types/dto';

type ROUTES =
  | typeof ROUTE_ADMIN
  | typeof ROUTE_EXAMINATION_LIST
  | typeof ROUTE_ORDER_LIST
  | typeof ROUTE_REGISTRATION_LIST
  | typeof ROUTE_RESULT_LIST
  | typeof ROUTE_STATISTIC
  | typeof ROUTE_STATISTICAL_REPORT
  | typeof ROUTE_TEMPLATE
  | 'telemedicine' // them route vao sau
  | '/timetable';

// map từ module --> route
export const moduleToRouteMap: Record<
  Exclude<USER_MODULE, USER_MODULE.REPORTING_READING>,
  ROUTES
> = {
  [USER_MODULE.ADMINISTRATION]: ROUTE_ADMIN,
  [USER_MODULE.REPORTING]: ROUTE_ORDER_LIST,
  [USER_MODULE.PUBLICATION]: ROUTE_RESULT_LIST,
  [USER_MODULE.STATISTICS]: ROUTE_STATISTICAL_REPORT,
  [USER_MODULE.REGISTRATION]: ROUTE_REGISTRATION_LIST,
  [USER_MODULE.EXAMINATION]: ROUTE_EXAMINATION_LIST,
  [USER_MODULE.SUMMARY]: ROUTE_STATISTIC,
  [USER_MODULE.TELEMEDICINE]: 'telemedicine',
  [USER_MODULE.TIMETABLE]: '/timetable',
  [USER_MODULE.TEMPLATE]: ROUTE_TEMPLATE,
} as const;

export const routeToModuleMap: Record<ROUTES, USER_MODULE> = (
  Object.entries(moduleToRouteMap) as Array<[USER_MODULE, ROUTES]>
).reduce((inverted, [key, value]) => ({ ...inverted, [value]: key }), {}) as Record<
  ROUTES,
  USER_MODULE
>;

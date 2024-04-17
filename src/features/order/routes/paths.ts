export enum OrderListPaths {
  Base = '/',
  MedicalHistory = '/medical-history',
}
export const ROUTE_ORDER_LIST = '/order';

export const ROUTE_MEDICAL_HISTORY = `${ROUTE_ORDER_LIST}${OrderListPaths.MedicalHistory}`;

/**
 * Define route paths here to avoid circular dependency
 */
export enum MobilePaths {
  Base = '/',
  OrderList = '/order',
}
export const ROUTE_MOBILE = '/mobile';
export const ROUTE_ORDER_LIST = `${ROUTE_MOBILE}${MobilePaths.OrderList}`;
export const DEFAULT_REDIRECT_MOBILE = ROUTE_ORDER_LIST;

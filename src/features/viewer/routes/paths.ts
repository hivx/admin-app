export enum VIEWER_PATH {
  BASE = '/',
  AI_VIEWER = '/ai',
}
export const ROUTE_VIEWER = '/viewer';
export const ROUTE_VIEWER_AI = `${ROUTE_VIEWER}${VIEWER_PATH.AI_VIEWER}`;

export enum AuthPaths {
  Login = 'login',
}
export const ROUTE_AUTH = '/auth';
export const ROUTE_LOGIN = `${ROUTE_AUTH}/${AuthPaths.Login}`;

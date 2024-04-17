export * from './theme';
export * from './client';
export * from './hotkeys';

const WINDOW_ORIGIN_TOKEN = '<origin>';

const preprocessAPIEndPoints = (input?: string): string => {
  if (!input) return '';
  else {
    if (input.includes(WINDOW_ORIGIN_TOKEN))
      return input.replace(WINDOW_ORIGIN_TOKEN, window.origin);
    return input;
  }
};

export const APP_NAME = import.meta.env.VITE_APP_NAME as string;
export const BASE_URL = import.meta.env.BASE_URL || '';
export const isDev = import.meta.env.DEV;
export const DEFAULT_USERNAME = isDev && (import.meta.env.VITE_APP_USERNAME as string);
export const DEFAULT_PASSWORD = isDev && (import.meta.env.VITE_APP_PASSWORD as string);
export const JWT_SECRET = '123456' as string;
export const TECHNICAL_SUPPORT_NUMBER = '0962.800.362';

// API endpoints
export const API_URL_SECURED = preprocessAPIEndPoints(
  import.meta.env.VITE_APP_API_URL_SECURED,
);
export const API_URL_ANALYSTIC = preprocessAPIEndPoints(
  import.meta.env.VITE_APP_API_URL_ANALYSTIC,
);

export const API_URL_CLINICAL = preprocessAPIEndPoints(
  import.meta.env.VITE_APP_API_URL_CLINICAL,
);
export const API_URL_QMS = preprocessAPIEndPoints(import.meta.env.VITE_APP_API_URL_QMS);
export const API_URL_KIOSK = preprocessAPIEndPoints(
  import.meta.env.VITE_APP_API_URL_KIOSK,
);
export const API_URL_CONN = preprocessAPIEndPoints(import.meta.env.VITE_APP_API_URL_CONN);
export const API_URL_PERMIT_ALL = preprocessAPIEndPoints(
  import.meta.env.VITE_APP_API_URL_PERMIT_ALL,
);

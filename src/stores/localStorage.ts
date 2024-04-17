import { uuidv4 } from './../utils/uuidv4';

export const APP_PREFIX = 'IT_';

/**
 * List all of the keys available for localStorage
 */
export const KEYS_CONFIG = {
  LANGUAGE: `${APP_PREFIX}lang`,
  SESSION_ID: `${APP_PREFIX}sessionID`,
  REFRESH_TOKEN: `${APP_PREFIX}rftoken`,
  HOSPITAL_ID: `${APP_PREFIX}hID`,
  /**
   * Difference between server time and local time
   */
  TIME_OFFSET: `${APP_PREFIX}timeOffset`,
};

/**
 * Create a unique Session ID that is unique for each browser instance
 */
export const findOrCreateSessionID = (): string => {
  const sessionID = localStorage.getItem(KEYS_CONFIG.SESSION_ID);
  if (sessionID) return sessionID;
  else {
    return createSessionID();
  }
};

export const createSessionID = (): string => {
  const id = uuidv4();
  localStorage.setItem(KEYS_CONFIG.SESSION_ID, id);
  return id;
};

export const getCurrentTimeOffset = (): number => {
  return parseInt(localStorage.getItem(KEYS_CONFIG.TIME_OFFSET) || '0', 10);
};

export const setCurrentTimeOffset = (offset: number): void => {
  localStorage.setItem(KEYS_CONFIG.TIME_OFFSET, offset.toString(10));
};

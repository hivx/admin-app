import { default as dayjs, Dayjs } from 'dayjs';

import { getCurrentTimeOffset } from '@/stores/localStorage';

import { DatePickerType } from '../types';

export const DATE_FORMAT = 'YYYYMMDD';
export const TIME_FORMAT = 'HHmmss';
export const INVALID_DATE = 'Invalid Date';

export enum DISPLAY_FORMAT {
  dateTime = 'DD/MM/YYYY HH:mm:ss',
  dateTimeNoSecond = 'DD/MM/YYYY HH:mm',
  time = 'HH:mm',
  date = 'DD/MM/YYYY',
  year = 'YYYY',
}

export enum PRINT_FORMAT {
  dateTime = 'DD/MM/YYYY HH:mm:ss',
  time = 'HH:mm',
  date = 'DD/MM/YYYY',
}
export const DATETIME_FORMAT = `${DATE_FORMAT}${TIME_FORMAT}`;

/**
 * Convert any date object to ITECH's format
 * Date: YYYYMMDD
 * Date and time: YYYYMMDD HH:MM:SS
 */
export const formatDate = (date: dayjs.ConfigType) =>
  date ? dayjs(date).format(DATE_FORMAT) : '';
export const formatDateTime = (date: dayjs.ConfigType) =>
  date ? dayjs(date).format(DATETIME_FORMAT) : '';
export const formatTime = (date: dayjs.ConfigType) =>
  date ? dayjs(date).format(TIME_FORMAT) : '';

/** Get current timezone date with offset from server time
 * @example
 * // in initializeDayjs.js
 * dayjs.tz.setDefault('Asia/Bangkok');
 *
 * // usage
 * getCurrentTime() // Bangkok time
 * dayjs() // client local time
 */
export const getCurrentTime = () => {
  const localTime = dayjs.tz(undefined);
  const offset = getCurrentTimeOffset();
  const currentTime = dayjs.tz(localTime.valueOf() - offset);
  return currentTime;
};

/**
 * Get Local time without server time offset
 */
export const getLocalTime = () => dayjs.tz(undefined);
/**
 * Similar to get current time but set HOURS to 0 for comparisons
 */
export const getCurrentDate = () =>
  getCurrentTime().set('hour', 0).set('minute', 0).set('second', 0);

/**
 * Similar to get current date time GMT +7
 */
export const getCurrentDateTime = () => getCurrentTime();

/**
 * Converts ITECH DATE format to Dayjs object
 * @example
 * DATE_FORMAT = 'YYYYMMDD'
 * date = '20221103'
 * dayjsDate = itechDateToDayjs(date)
 */
export const itechDateToDayjs = (date: string | null): Dayjs | null =>
  date ? dayjs(date, DATE_FORMAT).set('hour', 0).set('minute', 0).set('second', 0) : null;
/**
 * Converts ITECH DATE TIME format to Dayjs object
 * @example
 * DATE_FORMAT = 'YYYYMMDD HH:MM:SS'
 * datetime = '20221103 12:01:04'
 * dayjsDate = itechDateTimeToDayjs(datetime)
 */
export const itechDateTimeToDayjs = (date: string | null): Dayjs | null =>
  date ? dayjs(date, DATETIME_FORMAT) : null;

export const isSameDay = (firstDate: Dayjs | null, secondDate: Dayjs | null): boolean => {
  if (firstDate === null && secondDate === null) return true;
  return dayjs.tz(firstDate)?.isSame(dayjs.tz(secondDate), 'day') || false;
};

export const getFullTimeFromDateAndHour = (date?: string, hour?: string) => {
  // date follow by format: DATETIME_FORMAT: YYYYMMDDHHmmss
  // hour follow by format: DATETIME_FORMAT: YYYYMMDDHHmmss
  const dateString = date?.substring(0, 8);
  const hourString = hour?.substring(8);
  const fullTime = `${dateString}${hourString}`;
  return fullTime;
};

// HHmmss -> HH:mm

export const changeTimeFormat = (value: string) => {
  return value.match(/\d{2}/g)?.join(':').slice(0, -3);
};

const checkHoursMask = (value: string) => {
  if (value[0] === '2') {
    return /[0-3]/;
  } else {
    return /[0-9]/;
  }
};

export const getMaskTime = (value: string) => [
  /[0-2]/,
  checkHoursMask(value),
  ':',
  /[0-5]/,
  /\d/,
];

export const getMaskDate = () => [
  /\d/,
  /\d/,
  '/',
  /\d/,
  /\d/,
  '/',
  /\d/,
  /\d/,
  /\d/,
  /\d/,
];

export const getMaskDateTime = () => [
  /\d/,
  /\d/,
  '/',
  /\d/,
  /\d/,
  '/',
  /\d/,
  /\d/,
  /\d/,
  /\d/,
  ' ',
  /\d/,
  /\d/,
  ':',
  /\d/,
  /\d/,
];

export const getMaskForDateTime = (type: DatePickerType, value: string) => {
  switch (type) {
    case 'dateTime': {
      return getMaskDateTime();
    }
    case 'time': {
      return getMaskTime(value);
    }
    case 'date': {
      return getMaskDate();
    }
  }
};

export const setZeroSeconds = (value?: string) =>
  value ? value.slice(0, 12) + '00' : undefined;

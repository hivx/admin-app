import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
/**
 * Initialize timezone for dayjs
 * If we don't do this, dayjs default will return date
 * from its default time zone (GMT-0600 (Central Standard Time))
 * https://day.js.org/docs/en/timezone/set-default-timezone
 */
export const initializeDayjs = () => {
  dayjs.extend(customParseFormat);
  dayjs.extend(utc);
  dayjs.extend(timezone);
  dayjs.tz.setDefault('Asia/Bangkok');
};

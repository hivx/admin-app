import dayjs from 'dayjs';
import en from 'dayjs/locale/en';
import vi from 'dayjs/locale/vi';

import { useI18nContext } from '@/locales/i18n-react';
import { Locales } from '@/locales/i18n-types';

/**
 * Change dayjs default language based on current language
 * @returns undefined
 */
export const useDayjsLocale = () => {
  const context = useI18nContext();
  const { locale } = context;
  setDayJSLocale(locale);
  return;
};

const setDayJSLocale = (locale: Locales) => {
  switch (locale) {
    case 'en':
      dayjs.locale(en);
      break;
    case 'vi':
      dayjs.locale(vi);
      break;
  }
};

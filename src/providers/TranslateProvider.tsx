import { FC, PropsWithChildren } from 'react';
import { initLocalStorageDetector } from 'typesafe-i18n/detectors';

import TypesafeI18n from '@/locales/i18n-react';
import { detectLocale, locales } from '@/locales/i18n-util';
import { loadLocale } from '@/locales/i18n-util.sync';
import { KEYS_CONFIG } from '@/stores/localStorage';

const localStorageDetector = initLocalStorageDetector(KEYS_CONFIG.LANGUAGE);
const detectedLocale = detectLocale(localStorageDetector);
locales.forEach((locale) => loadLocale(locale));

export const TranslateProvider: FC<PropsWithChildren> = ({ children }) => {
  return <TypesafeI18n locale={detectedLocale}>{children}</TypesafeI18n>;
};

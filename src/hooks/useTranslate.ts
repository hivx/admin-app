import { useI18nContext } from '@/locales/i18n-react';
import { Locales, TranslationFunctions } from '@/locales/i18n-types';

import { KEYS_CONFIG } from './../stores/localStorage';
// Author: Triet
// Wrapper hook around useI18nContext with a more friendly name
// and use the translate function directly

/**
 * expose translate function to use outside React components
 */
export let translate: TranslationFunctions | null = null;

export const useTranslate = () => {
  const context = useI18nContext();
  translate = context.LL;
  return translate;
};

export const useLanguageToggle = () => {
  const context = useI18nContext();
  const { locale, setLocale } = context;

  const toggle = () => {
    const finalLang: Locales = locale === 'vi' ? 'en' : 'vi';
    setLocale(finalLang);
    localStorage.setItem(KEYS_CONFIG.LANGUAGE, finalLang);
  };
  return toggle;
};

import { useTheme } from '@mui/material';
import { useCallback } from 'react';

import { MODE_THEME } from '@/config/theme';
import { useAppDispatch } from '@/hooks';

import { setTheme } from '../stores/themeSlice';

/**
 * Change mode theme for App
 * @returns String
 */
export const useToggleTheme = () => {
  const theme = useTheme();
  const dispatch = useAppDispatch();

  const toggleTheme = useCallback(
    (theme: MODE_THEME) => {
      dispatch(setTheme(theme));
    },
    [dispatch],
  );

  return toggleTheme;
};

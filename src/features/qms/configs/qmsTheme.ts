import { createTheme, ThemeOptions } from '@mui/material';

import { themeOptions } from '@/config';

import favicon from '../assets/images/logo-hih.png';

const qmsThemeOptions = {
  palette: {
    primary: {
      main: '#104DA0',
    },
    background: {
      paper: '#ffffff',
      default: '#f0f1f4',
    },
    text: {
      primary: '#333547',
    },
  },
  qms: {
    images: {
      favicon: favicon,
    },
    layout: {
      navBarHeight: '20%',
      sidebarHeaderHeight: '30px',
      sidebarWidth: '250px',
      borderRadius: 0,
      qmsSidebarXS: 3,
      qmsLabelInfoHeight: '40px',
      qmsModalityItem: {
        width: '210px',
        height: '187px',
      },
    },
    customColors: {
      tableHeaderBackground: '#DCE9F4',
      modalityButtonBackground: '#FFFFFF',
    },
  },
} satisfies ThemeOptions;

export const qmsTheme = createTheme({ ...themeOptions, ...qmsThemeOptions });

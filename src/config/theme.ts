// import { ThemeOptions } from '@material-ui/core/styles/createMuiTheme';

import { colors, ThemeOptions, Theme as MUITHeme, PaletteMode } from '@mui/material';

import '@emotion/react';
import { CSSSize } from '@/types';

import { HOSPITAL_ID } from './client';
import { PACS_COLORS, QMS_COLORS } from './color';
import { HOSPITAL_ASSETS } from './hospitalAssets';

type PACS_THEME = {
  images: {
    login: string;
    navbar: string;
    favicon: string;
    statisticBar: string;
  };
  layout: {
    tableTheadHeight: CSSSize;
    navBarHeight: CSSSize;
    sidebarWidth: CSSSize;
    sidebarHeaderHeight: CSSSize;
    borderRadius: CSSSize;
    statisticBarHeight: CSSSize;
  };
  /**
   * Theme dependent colors
   */
  customColors: PACS_COLORS;
};

type QMS_THEME = {
  images: {
    favicon: string;
  };
  layout: {
    navBarHeight: CSSSize;
    sidebarWidth: CSSSize;
    sidebarHeaderHeight: CSSSize;
    borderRadius: CSSSize;
    qmsSidebarXS: number;
    qmsLabelInfoHeight: string;
    qmsModalityItem: {
      width: CSSSize;
      height: CSSSize;
    };
  };
  customColors: QMS_COLORS;
};

// extend MUI theme object
declare module '@mui/material/styles' {
  interface Theme {
    pacs?: PACS_THEME;
    qms?: QMS_THEME;
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    pacs?: PACS_THEME;
    qms?: QMS_THEME;
  }
}

declare module '@emotion/react' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface Theme extends MUITHeme {}
}
/**
 * Define theme mode
 */
export enum MODE_THEME {
  ITECH_THEME = 'itechTheme',
  DARK = 'dark',
  VIETRAD_THEME = 'vietradTheme',
}

type ModeThemeColor = {
  palette: ThemeOptions['palette'];
  customColors: PACS_COLORS;
};
const getModeTheme = (mode: MODE_THEME): ModeThemeColor => {
  switch (mode) {
    case MODE_THEME.ITECH_THEME:
      return lightModeTheme;

    case MODE_THEME.VIETRAD_THEME:
      return greyModeTheme;

    case MODE_THEME.DARK:
      return darkModeTheme;

    default:
      return lightModeTheme;
  }
};

const lightModeTheme: ModeThemeColor = {
  // palette values for light mode
  palette: {
    primary: {
      main: '#0E8A72',
    },
    action: {
      // active: 'red',
    },
    secondary: {
      main: '#0E8A72',
    },
    background: {
      paper: '#F0F1F4',
      default: '#FAFAFA',
    },
    text: {
      primary: '#1D1E3A',
      // secondary: '#1D1E3A',
    },
    mode: 'light',
  },
  customColors: {
    tableHeaderBackground: '#c8e3de',
    fieldDisabledBackground: '#e6e4e4',
    uploadNonDicomBackground: '#1d1e3a',
    borderColor: colors.grey[400],
    sidebarHeaderTitle: '#FFFFF',
    backgroundTable: '#FAFAFA',
    backgroundPanelContent: '#FAFAFA',
    backgroundEditor: '#FFF',
    borderSideHeaderColor: '#0E8A72',
    textSideHeaderColor: '#FAFAFA',
    textSideHeaderHover: '#C8E3DE',
    tableRowHoverColor: '#c8e3de',
    tableRowSelectedBackgroundColor: '#0000000a',
    textTableRowHoverColor: 'none',
    textTableRowSelectedColor: 'none',
    iconDefaultColor: '#0E8A72',
    textIconHoverColor: 'none',
    iconDynamicPanelInactiveColor: '#FAFAFA',
    backgroundButtonActiveColor: '#0E8A72',
    textButtonActiveColor: '#0E8A72',
    borderButtonColor: '#0E8A72',
    selectedItemSidebarColor: '#c8e3de',
    notchedOutlineInputColor: '#0E8A72',
    primaryTextColorNavbar: '#0E8A72',
    autoCompleteTagColor: '#1D1E3A',
    text: {
      label: '#707070',
      red: '#ED3333',
      green: '#0E8A72',
      blue: '#2957A4',
      gray: 'rgba(29, 30, 58, 0.6)',
      black: '#1D1E3A',
      orange: '#ED6C02',
    },
    statistic: {
      background: '#1D1E3A',
      title: '#FAFAFA',
    },
  },
};

const greyModeTheme: ModeThemeColor = {
  // palette values for light mode
  palette: {
    primary: {
      main: '#155ed1',
    },
    secondary: {
      main: '#DBDBDB',
    },
    action: {
      active: 'rgb(66 66 66)',
      // hover: 'rgb(21 94 209)',
      selected: 'rgb(21 94 209)',
      focus: 'rgb(21 94 209)',
    },
    background: {
      paper: '#DBDBDB',
      default: '#FAFAFA',
    },
    text: {
      primary: '#1D1E3A',
      // secondary: '#1D1E3A',
    },
    mode: 'light',
  },
  customColors: {
    tableHeaderBackground: '#DBDBDB',
    fieldDisabledBackground: '#e6e4e4',
    uploadNonDicomBackground: '#1d1e3a',
    borderColor: colors.grey[400],
    sidebarHeaderTitle: '#424242',
    backgroundTable: '#FAFAFA',
    backgroundPanelContent: '#DBDBDB',
    backgroundEditor: '#DBDBDB',
    borderSideHeaderColor: '#C5C5C5',
    textSideHeaderColor: '#212121',
    textSideHeaderHover: '#212121',
    tableRowHoverColor: '#155ed1',
    tableRowSelectedBackgroundColor: '#0000000a',
    textTableRowHoverColor: '#FAFAFA',
    textTableRowSelectedColor: '#FAFAFA',
    iconDefaultColor: '#424242',
    textIconHoverColor: '#FAFAFA',
    iconDynamicPanelInactiveColor: '#424242',
    backgroundButtonActiveColor: '#155ed1',
    textButtonActiveColor: '#424242',
    borderButtonColor: '#424242',
    selectedItemSidebarColor: '#155ed1',
    notchedOutlineInputColor: '#155ed1',
    primaryTextColorNavbar: '#424242',
    autoCompleteTagColor: '#FAFAFA',
    text: {
      label: '#707070',
      red: '#ED3333',
      green: '#0E8A72',
      blue: '#2957A4',
      gray: 'rgba(29, 30, 58, 0.6)',
      black: '#1D1E3A',
      orange: '#ED6C02',
    },
    statistic: {
      background: '#1D1E3A',
      title: '#FAFAFA',
    },
  },
};

const darkModeTheme: ModeThemeColor = {
  // palette values for dark mode
  palette: {
    primary: {
      main: '#F8F8F2',
      contrastText: '#E2E2E2',
    },
    secondary: {
      main: '#282A36',
    },
    background: {
      paper: '#282A36',
      default: '#282A36',
    },
    text: {
      primary: '#E2E2E2',
    },
    action: {
      active: '#E2E2E2',
    },
    mode: 'dark',
  },
  customColors: {
    tableHeaderBackground: '#44475A',
    fieldDisabledBackground: '#5e5e5e',
    uploadNonDicomBackground: '#1d1e3a',
    borderColor: '#4C5067',
    sidebarHeaderTitle: '#FFFFF',
    backgroundTable: '#FFFFF',
    backgroundPanelContent: '#44475A',
    backgroundEditor: '#44475A',
    borderSideHeaderColor: '#4C5067',
    textSideHeaderColor: '#F8F8F2',
    textSideHeaderHover: '#F8F8F2',
    tableRowHoverColor: '#44475A',
    tableRowSelectedBackgroundColor: '#0000000a',
    textTableRowHoverColor: 'none',
    textTableRowSelectedColor: 'none',
    iconDefaultColor: '#F8F8F2',
    textIconHoverColor: 'none',
    iconDynamicPanelInactiveColor: '#F8F8F2',
    backgroundButtonActiveColor: '#F8F8F2',
    textButtonActiveColor: '#F8F8F2',
    borderButtonColor: '#F8F8F2',
    selectedItemSidebarColor: 'rgba(248, 248, 242, 0.16)',
    notchedOutlineInputColor: '#c8e3de',
    primaryTextColorNavbar: '#F8F8F2',
    autoCompleteTagColor: '#FAFAFA',
    text: {
      label: '#707070',
      red: '#ED3333',
      green: '#47A895',
      blue: '#4875C1',
      gray: 'rgba(29, 30, 58, 0.6)',
      black: '#3c3c3c',
      orange: '#ED6C02',
    },
    statistic: {
      background: '#1D1E3A',
      title: '#FAFAFA',
    },
  },
};

/**
 * Default theme mode
 */
export const DEFAULT_THEME_MODE: PaletteMode = 'light';

/**
 * Produce a theme object based on light mode or dark mode
 */
export const getThemeOptions = (mode: MODE_THEME): ThemeOptions => {
  const { palette, customColors } = getModeTheme(mode);
  return {
    typography: {
      fontFamily: ['Kanit', 'Roboto', 'san-serif'].join(','),
      body2: {
        fontSize: 13,
      },
      body1: {
        fontSize: 14,
      },
    },
    palette,
    // scrollbar
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            scrollbarColor: colors.grey[700],
            '&::-webkit-scrollbar, & *::-webkit-scrollbar': {
              width: 5,
              height: 5,
            },
            '&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb': {
              borderRadius: 5,
              backgroundColor: colors.grey[700],
              minHeight: 24,
            },
            '&::-webkit-scrollbar-thumb:focus, & *::-webkit-scrollbar-thumb:focus': {
              backgroundColor: colors.grey[600],
            },
            '&::-webkit-scrollbar-thumb:active, & *::-webkit-scrollbar-thumb:active': {
              backgroundColor: colors.grey[600],
            },
            '&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover': {
              backgroundColor: colors.grey[600],
            },
          },
        },
      },
    },
    pacs: {
      images: {
        login: HOSPITAL_ASSETS[HOSPITAL_ID].logo.light,
        navbar: HOSPITAL_ASSETS[HOSPITAL_ID].logoWithName.light,
        statisticBar: HOSPITAL_ASSETS[HOSPITAL_ID].logoWithName.light,
        favicon: HOSPITAL_ASSETS[HOSPITAL_ID].favicon,
      },
      layout: {
        tableTheadHeight: '30px',
        navBarHeight: '40px',
        sidebarHeaderHeight: '30px',
        sidebarWidth: '250px',
        borderRadius: '5px',
        statisticBarHeight: '50px',
      },
      customColors,
      // customColors: {
      //   tableHeaderBackground: mode === MODE_THEME.ITECH_THEME ? '#c8e3de' : '#3c3c3c',
      //   fieldDisabledBackground: mode === MODE_THEME.ITECH_THEME ? '#e6e4e4' : '#5e5e5e',
      //   uploadNonDicomBackground: '#1d1e3a',
      //   borderColor: mode === MODE_THEME.ITECH_THEME ? colors.grey[400] : '#E2E2E2',
      //   text: {
      //     label: '#707070',
      //     red: '#ED3333',
      //     green: mode === MODE_THEME.ITECH_THEME ? '#0E8A72' : '#47A895',
      //     blue: mode === MODE_THEME.ITECH_THEME ? '#2957A4' : '#4875C1',
      //     gray: 'rgba(29, 30, 58, 0.6)',
      //     black: mode === MODE_THEME.ITECH_THEME ? '#1D1E3A' : '#3c3c3c',
      //   },
      //   statistic: {
      //     background: '#1D1E3A',
      //     title: '#FAFAFA',
      //   },
      // },
    },
  };
};

export const themeOptions: ThemeOptions = getThemeOptions(MODE_THEME.ITECH_THEME);

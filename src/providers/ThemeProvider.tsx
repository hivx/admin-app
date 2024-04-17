import {
  SerializedStyles,
  ThemeProvider as EmotionThemeProvider,
  Interpolation,
} from '@emotion/react';
import { css, createTheme, CssBaseline, ThemeProvider, colors } from '@mui/material';
import { FC, PropsWithChildren, useMemo } from 'react';

import { getThemeOptions } from '@/config/theme';
import { useAppSelector } from '@/hooks';
import { MUIInterpolatedThemeProps } from '@/types';

export const MyThemeProvider: FC<PropsWithChildren> = ({ children }) => {
  const modeTheme = useAppSelector((state) => state.theme.themeMode);
  const theme = useMemo(() => createTheme(getThemeOptions(modeTheme)), [modeTheme]);

  return (
    <ThemeProvider theme={theme}>
      <EmotionThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </EmotionThemeProvider>
    </ThemeProvider>
  );
};

const hoverStyles = (props: MUIInterpolatedThemeProps) => css`
  background-color: ${props.theme.pacs?.customColors.tableRowHoverColor};
  cursor: pointer;
  transition: ${props.theme.transitions.create('background-color', {
    duration: props.theme.transitions.duration.standard,
  })};
`;
const inputBackground: Interpolation<MUIInterpolatedThemeProps> = (props) =>
  css`
    background-color: ${props.theme.palette.background.default};
  `;
export const globalStyles = {
  hoverStyles,
  onMenuHover: (props) => css`
    &:hover {
      ${hoverStyles(props)}
      svg, p, * {
        color: ${props.theme.pacs?.customColors.textIconHoverColor};
      }
    }
  `,
  onMenuHoverDarken: (props) => css`
    &:hover {
      /* color: ${props.theme.palette.background.paper};
      color: 'red'; */
      color: ${props.theme.pacs?.customColors.tableRowHoverColor};

      cursor: pointer;
      transition: ${props.theme.transitions.create('background-color', {
        duration: props.theme.transitions.duration.standard,
      })};
    }
  `,
  centerChildren: css`
    display: flex;
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: center;
  `,
  leftChildren: css`
    display: flex;
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: left;
  `,
  rightChildren: css`
    display: flex;
    width: 100%;
    height: 100%;
    align-items: center;
    justify-content: right;
  `,
  linkAsText: css`
    &:visited,
    &:link {
      text-decoration: none;
    }
  `,
  ellipsisEffect: css`
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
  `,
  sidebarHeader: (props) => css`
    height: ${props.theme.pacs?.layout.sidebarHeaderHeight};
    min-height: ${props.theme.pacs?.layout.sidebarHeaderHeight};
    max-height: ${props.theme.pacs?.layout.sidebarHeaderHeight};
    background-color: ${props.theme.palette.secondary.main};
    color: ${props.theme.pacs?.customColors.textSideHeaderColor};
    border: 1px solid ${props.theme.pacs?.customColors.borderSideHeaderColor};
    white-space: nowrap;
    /* z-index: ${props.theme.zIndex.drawer}; */
  `,
  onSideHeaderHover: (props) => css`
    color: ${props.theme.pacs?.customColors.textSideHeaderHover};
    cursor: pointer;
  `,
  menuList: (props) => css`
    border: 1px solid ${colors.grey[400]};
    box-shadow: ${props.theme.shadows[5]};
    background-color: ${props.theme.palette.background.default};
    border-radius: ${props.theme.pacs?.layout.borderRadius};
    padding: ${props.theme.spacing(0.5)};
  `,
  inputBackground,
  paperInputBackground: (props) => css`
    .MuiPaper-root {
      ${inputBackground(props) as SerializedStyles}
    }
  `,
  datePickerInputBackground: (props) => css`
    .MuiCalendarOrClockPicker-root,
    .MuiPickersDay-root {
      ${inputBackground(props) as SerializedStyles}
    }
  `,
  extraSmallButton: (props) => css`
    padding: 2px;
  `,

  extraSmallAutoCompleteField: (props) => css`
    .MuiAutocomplete-root {
      .MuiInputBase-root {
        padding: 4px 14px;
        input {
          padding: 0;
        }
        .MuiButtonBase-root {
          height: 20px;
        }
        .MuiAutocomplete-endAdornment {
          font-size: 12px;
          top: 4px;
        }
      }
      .MuiAutocomplete-tag {
        margin: 0;
        svg {
          font-size: 20px;
        }
      }
    }
  `,

  extraSmallTextField: (props) => css`
    .MuiFormLabel-root {
      top: -10px;
      font-size: 12px;
      &.MuiInputLabel-shrink {
        top: 0;
      }
    }
    .MuiInputBase-root {
      input {
        padding: 4px 14px;
        ::-webkit-input-placeholder {
        }
      }
    }
  `,

  extraSmallDateTimeField: (props) => css`
    width: 100%;
    .MuiFormLabel-root {
      top: -3px;
      font-size: 12px;
      &.MuiInputLabel-shrink {
        top: 0;
      }
    }
    .MuiInputBase-root {
      input {
        padding: 4px 14px;
        ::-webkit-input-placeholder {
        }
      }
      button {
        padding: ${props.theme.spacing(0.75)};
        svg {
          font-size: 20px;
        }
      }
    }
  `,

  extraSmallSelectField: (props) => css`
    .MuiSelect-select {
      padding: 4px 32px 4px 14px;
      .MuiFormLabel-root {
        color: red;
        top: -10px;
        font-size: 12px;
        background-color: black;
        .MuiInputLabel-shrink {
          top: 0;
        }
      }
    }
    svg {
      font-size: 20px;
    }
    .MuiInputBase-root {
    }
  `,
} satisfies Record<string, SerializedStyles | Interpolation<MUIInterpolatedThemeProps>>;

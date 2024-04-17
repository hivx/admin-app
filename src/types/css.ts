import { Theme } from '@mui/material';
import { MUIStyledCommonProps } from '@mui/system';
type ColorHex = `#${string}`;
type ColorRGB = `rgb(${string})`;
type ColorRGBA = `rgba(${string})`;

export type CSSColor = ColorHex | ColorRGB | ColorRGBA;

export type CSSPx = `${string}px`;
export type CSSPercent = `${number}%`;

export type CSSSize = CSSPx | CSSPercent | number;

export type MUIInterpolatedThemeProps = MUIStyledCommonProps<Theme> & { theme: Theme };

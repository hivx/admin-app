import { css, styled, TypographyProps, Theme } from '@mui/material';

import { filterTransientProps } from '@/utils/filterTransientProps';

const getHeightFromTypography = (
  fontSize?: Theme['typography']['body2']['fontSize'],
  lineHeight?: Theme['typography']['body2']['lineHeight'],
) => {
  let sizeNumber;
  let lineHeightNumber;
  if (typeof fontSize === 'string') {
    sizeNumber = parseFloat(fontSize ? fontSize.replace('rem', '') : '1'); // fontSize in rem
  } else {
    sizeNumber = fontSize || 1; // fontSize number (px)
  }

  if (typeof lineHeight === 'string') {
    lineHeightNumber = parseFloat(lineHeight ? lineHeight.replace('rem', '') : '1'); // lineHeight in rem
  } else {
    lineHeightNumber = lineHeight || 1; // fontSize number (px)
  }

  return `${sizeNumber * (lineHeightNumber || 1)}rem`;
};

/**
 * Make every MUI input fields small enough to be inlined with text
 */
export const StyledInlineFormField = styled('div', filterTransientProps)<{
  $variant: TypographyProps['variant'];
}>`
  // set height based on text size:
  ${(props) => {
    const typography =
      props.$variant && props.$variant !== 'inherit'
        ? props.theme.typography[props.$variant]
        : props.theme.typography.body2;
    return css`
      --height: ${getHeightFromTypography(typography.fontSize, typography.lineHeight)};
    `;
  }}
  position: relative;
  height: var(--height);

  .MuiInputBase-root {
    position: absolute;
  }
  .MuiInputBase-root,
  .MuiSelect-select {
    ${(props) => {
      const typography =
        props.$variant && props.$variant !== 'inherit'
          ? props.theme.typography[props.$variant]
          : props.theme.typography.body2;
      return typography;
    }}
    height: var(--height);
    max-height: var(--height);
    padding-top: 0;
    padding-bottom: 0;
  }

  .MuiOutlinedInput-notchedOutline {
    border-width: 1px !important;
  }
`;

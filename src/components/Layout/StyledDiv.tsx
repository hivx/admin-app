import { styled } from '@mui/material';

import { globalStyles } from '@/providers/ThemeProvider';

/**
 * Automatically center children
 */
export const StyledDivCenterChildren = styled('div')`
  ${globalStyles.centerChildren}
`;

/**
 * Automatically left children
 */
export const StyledDivLeftChildren = styled('div')`
  ${globalStyles.leftChildren}
`;

/**
 * Automatically right children
 */
export const StyledDivRightChildren = styled('div')`
  ${globalStyles.rightChildren}
`;

/**
 * styled overflow text
 */
export const StyledLongText = styled('div')`
  ${globalStyles.ellipsisEffect}
`;

import { useMediaQuery, useTheme } from '@mui/material';

/**
 * Check the device is mobile or not
 * @returns boolean
 */
export const useDetectMobile = () => {
  const theme = useTheme();
  const isMobileSize = useMediaQuery(theme.breakpoints.down('sm'));
  return isMobileSize;
};

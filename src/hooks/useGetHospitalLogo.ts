import { useTheme } from '@mui/material';
import { useMemo } from 'react';

import { base64toURI } from '@/lib/dataHelper/base64FileHelper';

import { useHospitalDomain } from './useHospitalDomain';

/**
 * Logo dùng trong app,
 * Nếu không có logo từ API,
 * Dùng các logo default
 */
export const useGetHospitalLogo = () => {
  const theme = useTheme();
  const hospitalData = useHospitalDomain();

  const { logoURI, logoFullURI } = useMemo(() => {
    const logoURI = hospitalData?.logo && base64toURI(hospitalData.logo);
    const logoFullURI = hospitalData?.logoFull && base64toURI(hospitalData.logoFull);
    return { logoURI, logoFullURI };
  }, [hospitalData]);

  return {
    loginLogo: logoURI ?? theme.pacs?.images.login ?? '',
    navbarLogo: logoFullURI ?? theme.pacs?.images.navbar ?? '',
    pacsIcon: logoURI ?? theme.pacs?.images.favicon ?? '',
  };
};

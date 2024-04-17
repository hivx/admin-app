import { Box } from '@mui/material';
import { FC, Fragment, ReactNode } from 'react';

type TabPanelProps = {
  children: ReactNode;
  /**
   * Intrinsic tab value
   */
  tabValue: number | string;
  /**
   * Current value
   */
  value: number | string;
};

export const TabPanel: FC<TabPanelProps> = (props) => {
  const { children, value, tabValue, ...other } = props;

  return (
    <Box
      role="tabpanel"
      hidden={value !== tabValue}
      id={`simple-tabpanel-${tabValue}`}
      aria-labelledby={`simple-tab-${tabValue}`}
      sx={{ width: '100%', height: '100%' }}
      {...other}
    >
      {value === tabValue ? children : <></>}
    </Box>
  );
};

import { Box, Stack } from '@mui/material';
import React, { FC, ReactNode } from 'react';

type PatientWaitingScreenShellProps = {
  HeaderComponent: ReactNode;
  MainComponent: ReactNode;
};
export const PatientWaitingScreenShell: FC<PatientWaitingScreenShellProps> = (props) => {
  const { HeaderComponent, MainComponent } = props;
  return (
    <Stack spacing={0} width="100%" height="100%">
      <Box justifyContent="center" width="100%" height="100%" maxHeight="15vh">
        {HeaderComponent}
      </Box>
      <Box width="100%" height="100%">
        {MainComponent}
      </Box>
    </Stack>
  );
};

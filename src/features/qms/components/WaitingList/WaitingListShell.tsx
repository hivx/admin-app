import { Grid } from '@mui/material';
import React, { FC, ReactNode } from 'react';

type WaitingListShellProps = {
  HeaderComponent: ReactNode;
  TableComponent: ReactNode;
};
export const WaitingListShell: FC<WaitingListShellProps> = (props) => {
  const { HeaderComponent, TableComponent } = props;
  return (
    <Grid container direction="column" width="100%" height="100%" wrap="nowrap">
      <Grid item xs={2} justifyContent="center">
        {HeaderComponent}
      </Grid>
      <Grid item xs overflow="auto">
        {TableComponent}
      </Grid>
    </Grid>
  );
};

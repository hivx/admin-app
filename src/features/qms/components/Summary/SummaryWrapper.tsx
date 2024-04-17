import { Divider, Grid } from '@mui/material';
import React, { ReactNode } from 'react';

type SummaryWrapperProps = {
  SummaryHeader: ReactNode;
  SummaryList: ReactNode;
};

export const SummaryWrapper = (props: SummaryWrapperProps) => {
  return (
    <Grid
      container
      spacing={2}
      direction="column"
      width="100%"
      height="100%"
      wrap="nowrap"
    >
      <Grid item xs={2}>
        {props.SummaryHeader}
      </Grid>
      <Grid item xs={10}>
        {props.SummaryList}
      </Grid>
    </Grid>
  );
};

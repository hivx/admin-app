import { Grid } from '@mui/material';
import React, { ReactNode } from 'react';

type PlayerShellProps = {
  HeaderPlayer: ReactNode;
  PlayerComponent: ReactNode;
};

export const SpeakerQueueShell = (props: PlayerShellProps) => {
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
        {props.HeaderPlayer}
      </Grid>
      <Grid item xs={10}>
        {props.PlayerComponent}
      </Grid>
    </Grid>
  );
};

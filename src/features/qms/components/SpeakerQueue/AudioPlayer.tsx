import { Grid, Stack, Typography, styled } from '@mui/material';
import { ReactEventHandler, useRef, useState } from 'react';

import logo from '../../assets/images/Speaker_Icon.png';
import { ISoundDTO } from '../../types';

type AudioPlayerProps = {
  sound?: ISoundDTO;
  onPlayerEnded: (id: ISoundDTO['id']) => void;
  /**
   * Number of repeats before onPlayerEnded will call
   * @default 1
   */
  repeat?: number;
};

export const AudioPlayer = (props: AudioPlayerProps) => {
  const { sound, onPlayerEnded, repeat = 1 } = props;
  const audioRef = useRef<HTMLAudioElement>(null);
  const [_, setTimePlayed] = useState<number>(0);

  const handleAudioEnded: ReactEventHandler<HTMLAudioElement> = (e) => {
    setTimePlayed((currentTime) => {
      const nextTime = currentTime + 1;
      if (nextTime === repeat) {
        // reached number of repeat time, callback then reset state
        sound && onPlayerEnded(sound.id);
        return 0;
      }
      // continue playing
      audioRef.current?.play();
      return nextTime;
    });
  };

  return (
    <StyledPlayerWrapper padding={3}>
      <Grid container direction={'column'} width={'100%'} height={'100%'}>
        <Grid
          item
          xs={2}
          display={'flex'}
          flexDirection={'column'}
          alignItems="center"
          justifyContent="center"
        >
          <Typography fontSize={24} fontWeight={500}>
            {sound?.patientName}
          </Typography>
          <Typography>{sound?.modalityRoom}</Typography>
        </Grid>
        <Grid item xs={8} display={'flex'} alignItems="center" justifyContent="center">
          <Stack width={'250px'} height={'250px'}>
            <StyledSpinner src={logo} alt="logo"></StyledSpinner>
          </Stack>
        </Grid>
        <Grid item xs={2} display={'flex'} alignItems="center" justifyContent="center">
          {sound && (
            <StyledAudioControl
              key={sound.id}
              autoPlay
              ref={audioRef}
              controls
              src={`data:audio/wav;base64,${sound?.audio}`}
              onEnded={handleAudioEnded}
            >
              <track kind="captions" />
            </StyledAudioControl>
          )}
        </Grid>
      </Grid>
    </StyledPlayerWrapper>
  );
};

const StyledPlayerWrapper = styled(Stack)`
  background-color: ${(props) => props.theme.palette.background.default};
  width: 100%;
  height: 100%;
`;

const StyledAudioControl = styled('audio')`
  width: 100%;
`;

const StyledSpinner = styled('img')(() => ({
  // animation: `nfLoaderSpin infinite 3000ms linear`,
  // '@keyframes nfLoaderSpin': {
  //   from: {
  //     transform: 'rotate(0deg)',
  //   },
  //   to: {
  //     transform: 'rotate(360deg)',
  //   },
  // },
}));

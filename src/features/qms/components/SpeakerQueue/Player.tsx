import { Grid, Stack, styled } from '@mui/material';
import { useParams } from 'react-router-dom';

import { FullPageSpinner } from '@/components/Layout/FullPageSpinner';

import { usePlaySpeakerQueue } from '../../hooks/usePlaySpeakerQueue';

import { AudioList } from './AudioList';
import { AudioPlayer } from './AudioPlayer';

type PlayerProps = {
  speakerId: number;
};

export const ConnectedPlayer = () => {
  const { speaker: speakerId } = useParams();

  return speakerId ? <Player speakerId={parseInt(speakerId)} /> : <FullPageSpinner />;
};

export const Player = (props: PlayerProps) => {
  const { onPlayerEnded, currentSound, listSoundData } = usePlaySpeakerQueue({
    speakerId: props.speakerId,
  });

  return (
    <Grid container width={'100%'} height={'100%'}>
      <Grid item xs={4}>
        <StyledPlayer>
          <AudioPlayer onPlayerEnded={onPlayerEnded} sound={currentSound} />
        </StyledPlayer>
      </Grid>
      <Grid item xs={8}>
        <StyledList>
          {/* <QMSDisplayTable TableComponent={<AudioList />} />
           */}
          <AudioList listSound={listSoundData} currentSoundID={currentSound?.id} />
        </StyledList>
      </Grid>
    </Grid>
  );
};

const StyledPlayer = styled(Stack)`
  width: 100%;
  height: 100%;
`;

const StyledList = styled(Stack)`
  width: 100%;
  height: 100%;
`;

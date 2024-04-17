import React from 'react';

import { HeaderSpeakerQueue } from './HeaderSpeakerQueue';
import { ConnectedPlayer } from './Player';
import { SpeakerQueueLayout } from './SpeakerQueueLayout';
import { SpeakerQueueShell } from './SpeakerQueueShell';

export const MainSpeakerQueue = () => {
  return (
    <SpeakerQueueLayout>
      <SpeakerQueueShell
        HeaderPlayer={<HeaderSpeakerQueue />}
        PlayerComponent={<ConnectedPlayer />}
      />
    </SpeakerQueueLayout>
  );
};

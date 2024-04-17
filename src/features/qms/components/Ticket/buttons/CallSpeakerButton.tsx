import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import React from 'react';

import { IconButtonWithToolTip } from '@/components/Elements/Buttons/IconButtonWithToolTip';
import { HOTKEYS } from '@/config';
import { useKeybinds } from '@/hooks';
import { IGetManyResourcesQuery } from '@/types';

import { useCallSpeakerButton } from '../../../hooks/useCallSpeakerButton';
import { ISearchTicketFilter } from '../../../types';

type CallSpeakerButtonProps = {
  query: IGetManyResourcesQuery<ISearchTicketFilter>;
};

export const CallSpeakerButton = (props: CallSpeakerButtonProps) => {
  const { query } = props;

  const { callSpeaker, isDisableButton } = useCallSpeakerButton({
    query,
  });

  useKeybinds('space', () => {
    callSpeaker();
  });
  return (
    <IconButtonWithToolTip
      disabled={isDisableButton}
      title={`Gọi loa (${HOTKEYS.CALL_SPEAKER.title})`}
      onClick={async () => callSpeaker()}
    >
      <VolumeUpIcon />
    </IconButtonWithToolTip>
  );
};

import { Stack } from '@mui/material';

import { UserClockEditIcon } from '@/assets/icon';

import { LeftIcon } from './LeftIcon';
import { RightIcon } from './RightIcon';
import { UsersCellActionButton } from './UsersCellActionButton';

export const TimeTableActionButton = () => {
  return (
    <Stack direction="row">
      <LeftIcon />
      <UsersCellActionButton />
      <RightIcon />
    </Stack>
  );
};

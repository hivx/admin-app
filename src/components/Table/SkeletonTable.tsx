import { Skeleton, Stack } from '@mui/material';

export const SkeletonTable = () => (
  <Stack spacing={0.5}>
    <Skeleton variant="text" sx={{ fontSize: '2rem' }} />
    <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
    <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
    <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
    <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
    <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
    <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
    <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
    <Skeleton variant="text" sx={{ fontSize: '1rem' }} />
  </Stack>
);

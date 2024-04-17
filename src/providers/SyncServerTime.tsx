import React, { FC, PropsWithChildren } from 'react';

import { useSyncServerTime } from '@/hooks/useSyncServerTime';

export const SyncServerTime: FC<PropsWithChildren> = (props) => {
  useSyncServerTime();
  return <>{props.children}</>;
};

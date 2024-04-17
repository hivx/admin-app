import React, { FC, PropsWithChildren } from 'react';

import { useDayjsLocale } from '@/hooks/useDayjsLocale';

/**
 * Watch for changes in locale and set dayjs locale accordingly
 * TODO: make this a provider with custom functions
 */
export const DayjsProvider: FC<PropsWithChildren> = (props) => {
  useDayjsLocale();
  return <>{props.children}</>;
};

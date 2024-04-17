import { ReactElement } from 'react';

import { MyTooltip } from '@/components/Elements/Tooltip/MyTooltip';

export const VersionTooltip = (props: { children: ReactElement }) => {
  const releaseDate = document.querySelector(
    'meta[name="release-date"]',
  ) as HTMLMetaElement;
  const version = document.querySelector('meta[name="version"]') as HTMLMetaElement;
  return (
    <MyTooltip title={`${version?.content}-${releaseDate?.content}`} placement="bottom">
      {props.children}
    </MyTooltip>
  );
};

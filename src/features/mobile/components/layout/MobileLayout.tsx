import { Divider, styled } from '@mui/material';
import React, { FC } from 'react';

import PacsHead from '@/components/Head/PacsHead';
import { ContentLayout } from '@/components/Layout/ContentLayout';

import { MobileNavbar } from './MobileNavbar';

type MobileLayoutProps = {
  children: React.ReactNode;
  title: string;
};

const StyledMobileLayout = styled(ContentLayout)`
  display: flex;
  max-width: 100dvw;
  width: 100dvw;
  height: 100dvh;
  max-height: 100dvh;
  flex-direction: column;
  overflow: hidden;
`;

export const MobileLayout: FC<MobileLayoutProps> = ({ children, title }) => {
  return (
    <StyledMobileLayout Head={<PacsHead customTitle={title} />}>
      <MobileNavbar />
      <Divider />
      {children}
    </StyledMobileLayout>
  );
};

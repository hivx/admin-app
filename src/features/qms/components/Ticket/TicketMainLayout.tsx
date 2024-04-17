import { styled } from '@mui/material';
import * as React from 'react';

import QmsHead from '@/components/Head/QmsHead';
import { ContentLayout } from '@/components/Layout/ContentLayout';

type LayoutProps = {
  children: React.ReactNode;
  title: string;
};

const StyledLayout = styled(ContentLayout)`
  display: flex;
  max-width: 100vw;
  width: 100vw;
  height: 100vh;
  flex-direction: row;
  overflow: hidden;
`;

export const TicketMainLayout = ({ children }: LayoutProps) => {
  return (
    <StyledLayout Head={<QmsHead customTitle="Phòng chụp" />}>{children}</StyledLayout>
  );
};

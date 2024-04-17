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
  width: 100vw;
  height: 100vh;
  align-items: center;
  justify-content: center;
`;

export const RegistrationListLayout = ({ children, title }: LayoutProps) => {
  return <StyledLayout Head={<QmsHead customTitle={title} />}>{children}</StyledLayout>;
};

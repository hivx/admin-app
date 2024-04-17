import { styled } from '@mui/material';
import * as React from 'react';

import PacsHead from '@/components/Head/PacsHead';
import { ContentLayout } from '@/components/Layout/ContentLayout';

import background from '../assets/background.jpeg';

type LayoutProps = {
  children: React.ReactNode;
  title: string;
};

// // emotion
// const StyledLayout = styled('div')({
//   display: 'flex',
//   width: '100vw',
//   height: '100vh',
//   alignItems: 'center',
//   justifyContent: 'center',
//   backgroundImage: `url(${background})`,
// });

// styled-component
const StyledLayout = styled(ContentLayout)`
  display: flex;
  width: 100vw;
  height: 100vh;
  align-items: center;
  justify-content: center;
  background-image: url(${background});
`;

export const AuthLayout = ({ children, title }: LayoutProps) => {
  return <StyledLayout Head={<PacsHead customTitle={title} />}>{children}</StyledLayout>;
};

import { styled } from '@mui/material';
import { ReactNode } from 'react';

import PacsHead from '@/components/Head/PacsHead';
import { ContentLayout } from '@/components/Layout/ContentLayout';

type LayoutProps = {
  children: ReactNode;
  title: string;
};

export const ResultListLayout = ({ children, title }: LayoutProps) => {
  return <StyledLayout Head={<PacsHead customTitle={title} />}>{children}</StyledLayout>;
};

const StyledLayout = styled(ContentLayout)`
  display: flex;
  max-width: 100vw;
  width: 100%;
  height: 100%;
  max-height: 100%;
  flex-direction: row;
  overflow: hidden;
`;

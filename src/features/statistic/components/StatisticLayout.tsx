import { styled } from '@mui/material';
import * as React from 'react';

import PacsHead from '@/components/Head/PacsHead';
import { ContentLayout } from '@/components/Layout/ContentLayout';

type LayoutProps = {
  children: React.ReactNode;
  title: string;
};

const StyledLayout = styled(ContentLayout)`
  display: grid;
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.theme?.pacs?.customColors.statistic.background};
  color: ${(props) => props.theme?.pacs?.customColors.statistic.title};
  overflow: auto;
`;
/**
 * Contains PacsHead and the page contents of statistic route
 */
export const StatisticLayout = ({ children, title }: LayoutProps) => {
  return <StyledLayout Head={<PacsHead customTitle={title} />}>{children}</StyledLayout>;
};

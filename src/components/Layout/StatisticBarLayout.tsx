import { styled, useTheme } from '@mui/material';
import * as React from 'react';

import { StatisticBar } from './NavBar/StatisticBar';

type NarBarLayoutProps = {
  children: React.ReactNode;
};

const StyledBarLayout = styled('div')`
  min-height: 100vh;
  min-width: 100vw;
  max-width: 100vw;
  display: grid;
  grid-template-rows: auto 1fr;
`;

const MainContentContainer = styled('div')`
  max-height: ${(props) =>
    `calc(100vh - ${props.theme.pacs?.layout.statisticBarHeight})`};
`;

/**
 * Contains StatisticBar and the page contents of protected route
 */
export const StatisticBarLayout = ({ children }: NarBarLayoutProps) => {
  const theme = useTheme();
  return (
    <StyledBarLayout>
      <StatisticBar logo={theme.pacs?.images.statisticBar || ''} />
      <MainContentContainer>{children}</MainContentContainer>
    </StyledBarLayout>
  );
};

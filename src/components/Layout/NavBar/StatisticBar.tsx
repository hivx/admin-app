import { Box, colors, styled, useTheme } from '@mui/material';
import { FC } from 'react';

import { useTranslate } from '@/hooks';

import { VersionTooltip } from './VersionTooltip';

type IStatisticBarProps = {
  logo: string;
};
/**
 * Header for page in statistic route
 */
export const StatisticBar: FC<IStatisticBarProps> = (props) => {
  const { logo } = props;
  const theme = useTheme();
  const translate = useTranslate();

  return (
    <StyledStatisticBar sx={{ boxShadow: 1 }}>
      <StyledBox
        sx={{
          minWidth: theme.pacs?.layout.sidebarWidth,
          width: theme.pacs?.layout.sidebarWidth,
          height: '100%',
        }}
      >
        <VersionTooltip>
          <StyledLogo src={logo} alt="logo" />
        </VersionTooltip>
      </StyledBox>
      <StyledTitle>{translate.pages.statistic.title()}</StyledTitle>
    </StyledStatisticBar>
  );
};

/**
 * Styles
 */

const StyledBox = styled(Box)`
  position: absolute;
`;

const StyledStatisticBar = styled('div')`
  display: flex;
  width: 100vw;
  max-width: 100vw;
  position: relative;
  height: ${(props) => props.theme.pacs?.layout.statisticBarHeight};
  border-bottom: 1px solid ${colors.grey[400]};
  flex-wrap: nowrap;
  text-align: center;
`;

const StyledLogo = styled('img')`
  width: 100%;
  max-width: 100%;
  height: 100%;
  max-height: 100%;
  padding: ${(props) => props.theme.spacing('5px', 1)};
  object-fit: contain;
`;

const StyledTitle = styled('div')`
  width: 100%;
  max-width: 100%;
  height: 100%;
  max-height: 100%;
  padding: ${(props) => props.theme.spacing('5px', 1)};
  object-fit: contain;
  font-weight: 400;
  font-size: 2rem;
  color: ${(props) => props.theme.palette.primary.main};
  display: flex;
  align-items: center;
  justify-content: center;
`;

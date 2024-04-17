import { Box, styled, Typography } from '@mui/material';

import { useClock } from '@/hooks/useClock';
import { DISPLAY_FORMAT } from '@/utils/dateUtils';

export const SummaryCurrentTime = () => {
  const time = useClock(1000);
  return (
    <StyledSummaryCurrentTimeWrapper>
      <StyledTypography align="center">
        {time.format('DD/MM/YYYY HH:mm:ss')}
      </StyledTypography>
    </StyledSummaryCurrentTimeWrapper>
  );
};

const StyledSummaryCurrentTimeWrapper = styled('div')`
  width: 100%;
  flex-direction: column;
`;

const StyledTypography = styled(Typography)`
  ${(props) => props.theme.typography.h5}
  color: ${(props) => props.theme.palette.primary.main};
`;

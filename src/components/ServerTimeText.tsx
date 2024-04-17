import { Box, styled, Typography } from '@mui/material';

import { useClock } from '@/hooks/useClock';
import { DISPLAY_FORMAT } from '@/utils/dateUtils';

export const ServerTimeText = () => {
  const time = useClock(60000);
  return (
    <StyledServerTimeTextWrapper>
      <StyledTypography>{time.format(DISPLAY_FORMAT.date)}</StyledTypography>
      <StyledTypography>{time.format(DISPLAY_FORMAT.time)}</StyledTypography>
    </StyledServerTimeTextWrapper>
  );
};

const StyledServerTimeTextWrapper = styled(Box)`
  display: flex;
  flex-direction: column;
`;

const StyledTypography = styled(Typography)`
  ${(props) => props.theme.typography.body2}
  color: ${(props) => props.theme.pacs?.customColors.primaryTextColorNavbar};
  text-align: center;
  margin: auto;
`;

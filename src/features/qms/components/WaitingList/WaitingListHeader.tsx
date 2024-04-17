import { Stack, styled, Typography } from '@mui/material';

import { HOSPITAL_NAME } from '@/config';

import logo from '../../assets/images/logo-hih.svg';

export const WaitingListHeader = () => {
  return (
    <StyledHeaderContainer>
      <Stack spacing={0}>
        <Stack direction="row" spacing={2} alignItems="center" justifyContent="center">
          <LogoWrapper>
            <StyledLogo src={logo} alt="logo"></StyledLogo>
          </LogoWrapper>
          <Typography
            variant="h3"
            textTransform="uppercase"
            fontWeight={600}
            color="primary"
          >
            {HOSPITAL_NAME}
          </Typography>
        </Stack>
        <Typography
          variant="h3"
          textTransform="uppercase"
          fontWeight={600}
          color="red"
          align="center"
        >
          Nhận kết quả
        </Typography>
      </Stack>
    </StyledHeaderContainer>
  );
};

const StyledHeaderContainer = styled('div')`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

const LogoWrapper = styled('div')`
  display: inline;
  /* width: ${(props) => props.theme.typography.h1.fontSize}; */
  position: relative;
`;
const StyledLogo = styled('img')`
  height: ${(props) => props.theme.typography.h1.fontSize};
  top: 0;
  left: 0;
`;

import { Stack, styled, Typography } from '@mui/material';

import { HOSPITAL_NAME } from '@/config';

import logo from '../../assets/images/logo-hih.svg';

export const PatientWaitingScreenHeader = () => {
  return (
    <StyledHeaderContainer>
      <Stack
        direction="row"
        spacing={2}
        alignItems="center"
        justifyContent="center"
        height="100%"
      >
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
  height: 100%;
  position: relative;
  padding: ${(props) => props.theme.spacing(1)};
`;
const StyledLogo = styled('img')`
  height: 100%;
  top: 0;
  left: 0;
`;

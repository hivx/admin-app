import { Stack, styled, Typography } from '@mui/material';

import { HOSPITAL_NAME } from '@/config';

import logo from '../../assets/images/logo-hih.svg';

export const HeaderSpeakerQueue = () => {
  return (
    <StyledHeaderContainer>
      <Stack spacing={0}>
        <Stack direction="row" spacing={2} alignItems="center" justifyContent="center">
          <StyledLogo src={logo} alt="logo"></StyledLogo>
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
          Tự động gọi loa
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

const StyledLogo = styled('img')`
  height: ${(props) => props.theme.typography.h1.fontSize};
  top: 0;
  left: 0;
`;

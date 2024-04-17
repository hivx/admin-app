import { Grid, Stack, Typography, styled } from '@mui/material';
import React from 'react';

import { MyButton } from '@/components';
import { HOSPITAL_NAME, HOSPITAL_NAME_EN } from '@/config';

import logo from '../../assets/images/logo-hih.svg';

import { SummaryCurrentTime } from './SummaryCurrentTime';

export const SummaryHeader = () => {
  return (
    <Grid container display={'flex'} padding={2}>
      <Grid item xs={6}>
        <Stack
          direction="row"
          spacing={2}
          alignItems="center"
          justifyContent="left"
          height="100%"
        >
          <StyledLogoWrapper>
            <StyledLogo src={logo} alt="logo"></StyledLogo>
          </StyledLogoWrapper>
          <Stack>
            <Typography
              variant="h4"
              textTransform="uppercase"
              fontWeight={500}
              color="primary"
            >
              {HOSPITAL_NAME}
            </Typography>
            <Typography
              variant="h5"
              textTransform="uppercase"
              fontWeight={400}
              color="primary"
              sx={{ fontStyle: 'italic' }}
            >
              {HOSPITAL_NAME_EN}
            </Typography>
          </Stack>
        </Stack>
      </Grid>
      <Grid item xs={6}>
        <StyledTitleWrapper>
          <Typography
            variant="h3"
            align="center"
            textTransform="uppercase"
            fontWeight={600}
            color="primary"
          >
            Số thứ tự tổng hợp
          </Typography>
          <SummaryCurrentTime />
        </StyledTitleWrapper>
      </Grid>
    </Grid>
  );
};

const StyledTitleWrapper = styled(Stack)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 100%;
  height: 100%;
`;

const StyledLogoWrapper = styled('div')`
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

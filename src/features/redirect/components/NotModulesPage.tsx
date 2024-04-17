import { Stack, Typography, styled } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import { MyButton } from '@/components';
import { ROUTE_LOGIN } from '@/features/auth';
import { useTranslate } from '@/hooks';

export const NotModulesPage = () => {
  const translate = useTranslate();
  const navigate = useNavigate();
  return (
    <NotModulesPageContainer alignItems={'center'}>
      <Typography>{translate.pages.notModules.title()}</Typography>
      <MyButton onClick={() => navigate(ROUTE_LOGIN)} variant="outlined">
        {translate.buttons.logout()}
      </MyButton>
    </NotModulesPageContainer>
  );
};

const NotModulesPageContainer = styled(Stack)`
  display: flex;
  width: 100%;
  height: 100%;
`;

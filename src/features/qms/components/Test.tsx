import { Typography } from '@mui/material';
import React from 'react';
import { useNavigate } from 'react-router-dom';

import { MyButton } from '@/components';

import { ROUTE_RECEPTION } from '../routes';

export const Test = () => {
  const navigate = useNavigate();

  return (
    <>
      <MyButton
        onClick={() => {
          navigate(ROUTE_RECEPTION);
        }}
      >
        Test navigate
      </MyButton>
      <Typography color="primary">aaaaaaaaaaaa</Typography>
      <Typography color="primary">aaaaaaaaaaaa</Typography>
      <Typography color="primary">aaaaaaaaaaaa</Typography>
      <Typography color="primary">aaaaaaaaaaaa</Typography>
      <Typography color="primary">aaaaaaaaaaaa</Typography>
    </>
  );
};

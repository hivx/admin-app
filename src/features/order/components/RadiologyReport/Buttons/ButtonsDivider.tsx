import { Divider, styled } from '@mui/material';
import React from 'react';

export const ButtonsDivider = () => {
  return <StyledDivider variant="middle" orientation="vertical" flexItem />;
};

const StyledDivider = styled(Divider)`
  border-color: ${(props) => props.theme.palette.primary.main};
`;

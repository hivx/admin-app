import { styled, useTheme } from '@mui/material';
import React from 'react';

import { ConnectedUserMenu } from '@/components/Layout/NavBar/UserMenu';

export const MobileNavbar = () => {
  const theme = useTheme();
  return (
    <StyledMobileNavBar>
      <StyledLogo src={theme.pacs?.images.navbar || ''} alt="logo" />
      <ConnectedUserMenu />
    </StyledMobileNavBar>
  );
};

const StyledMobileNavBar = styled('div')`
  display: flex;
  width: 100dvw;
  justify-content: space-between;
  align-items: center;
`;

const StyledLogo = styled('img')`
  padding: ${(props) => props.theme.spacing('5px', 1)};
  max-width: 200px;
  max-height: 40px;
  object-fit: contain;
`;

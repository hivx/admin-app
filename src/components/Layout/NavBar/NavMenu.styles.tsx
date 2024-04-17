import MenuIcon from '@mui/icons-material/Menu';
import { MenuItem, styled, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

import { MyButtonBase } from '@/components/Elements/Buttons/MyButtonBase';
import { globalStyles } from '@/providers/ThemeProvider';

export const StyledMenuTitle = styled(Typography)`
  font-weight: 400;
  font-size: ${(props) => props.theme.typography.body1};
  color: ${(props) => props.theme.palette.primary.main};
  color: ${(props) => props.theme.pacs?.customColors?.primaryTextColorNavbar};
  padding: ${(props) => props.theme.spacing(0, 1)};
`;
export const StyledCurrentMenuTitle = styled(StyledMenuTitle)`
  text-transform: uppercase;
  font-weight: 500;
`;

export const StyledNavMenu = styled('div')`
  width: fit-content;
  height: 100%;
`;

export const StyledMenuButton = styled(MyButtonBase)`
  height: 100%;
  ${globalStyles.onMenuHover};
`;

export const StyledCurrentMenu = styled('div')`
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 100%;
  white-space: nowrap;
`;

export const StyledMenuIcon = styled(MenuIcon)`
  color: ${(props) => props.theme.pacs?.customColors.primaryTextColorNavbar};
`;

export const StyledCurrentMenuLink = styled(Link)`
  ${globalStyles.linkAsText};
  height: 100%;
`;

import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Grid, styled, Typography } from '@mui/material';

import { MyDivider } from '@/components/Elements';
import { MyButtonBase } from '@/components/Elements/Buttons/MyButtonBase';
import { globalStyles } from '@/providers/ThemeProvider';

export const StyledUserMenu = styled(MyButtonBase)`
  display: flex;
  height: 100%;
  max-width: 100%;
  align-items: center;
  justify-content: end;
  padding: ${(props) => props.theme.spacing(0, 1)};
  ${globalStyles.onMenuHover};
  svg,
  p {
    color: ${(props) => props.theme.pacs?.customColors.primaryTextColorNavbar};
  }
  &:hover {
    svg,
    p {
      color: ${(props) => props.theme.pacs?.customColors.textTableRowHoverColor};
    }
  }
`;

export const StyledAccountCircleIcon = styled(AccountCircleIcon)`
  color: ${(props) => props.theme.pacs?.customColors.primaryTextColorNavbar};
  margin: ${(props) => props.theme.spacing(0, 0.5)};
`;

export const StyledUserFullname = styled(Typography)`
  display: block;
  font-size: 13px;
  align-items: center;
  max-width: 100%;
  color: ${(props) => props.theme.pacs?.customColors.primaryTextColorNavbar};
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

export const StyledGridBox = styled(Grid)`
  width: 100%;
  margin-left: 0px;
`;

export const StyledGridUsername = styled(Grid)`
  text-align: center;
`;

export const StyledGridButton = styled(Grid)`
  text-align: center;
`;

export const StyledGridLabel = styled(Grid)`
  padding-left: 0px !important;
`;

export const StyledDivider = styled(MyDivider)`
  width: 100%;
  padding-top: 8px;
`;

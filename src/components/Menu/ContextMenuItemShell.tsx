import LabelIcon from '@mui/icons-material/Label';
import {
  ListItemIcon,
  MenuItemProps,
  Stack,
  styled,
  Typography,
  useTheme,
} from '@mui/material';
import { FC, ReactNode } from 'react';

import { StyledMenuItem } from './StyledMenuItem';
type ContextMenuItemShellProps = {
  MenuItemProps?: MenuItemProps;
  IconComponent?: ReactNode;
  MainComponent: ReactNode;
  hotkeyString?: string;
  isDisplayIcon?: boolean;
};
export const ContextMenuItemShell: FC<ContextMenuItemShellProps> = (props) => {
  const {
    MenuItemProps,
    IconComponent,
    MainComponent,
    hotkeyString,
    isDisplayIcon = true,
  } = props;
  const theme = useTheme();
  const PlaceholderIconComponent = <LabelIcon fontSize="small" color="inherit" />;
  return (
    <StyledMenuItem {...MenuItemProps}>
      <Stack direction="row" spacing={5} width="100%">
        <StyledIconAndMainContainer>
          {isDisplayIcon ? (
            <ListItemIcon>{IconComponent || PlaceholderIconComponent}</ListItemIcon>
          ) : (
            <></>
          )}
          {MainComponent}
        </StyledIconAndMainContainer>
        {hotkeyString ? (
          <StyledHotkeyContainer>
            <Typography color={theme.pacs?.customColors.text.label}>
              {hotkeyString}
            </Typography>
          </StyledHotkeyContainer>
        ) : (
          <></>
        )}
      </Stack>
    </StyledMenuItem>
  );
};

const StyledIconAndMainContainer = styled('div')`
  display: flex;
  align-items: center;
`;
const StyledHotkeyContainer = styled('div')`
  display: flex;
  width: 100%;
  justify-content: end;
`;

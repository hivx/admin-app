import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Box, Grid, Menu, Stack, Typography, useTheme } from '@mui/material';
import { FC } from 'react';

import { ChangePasswordButtons } from '@/components/ChangePassword/ChangePasswordButtons';
import { MyButton } from '@/components/Elements';
import { AnimatedIcon } from '@/components/Elements/Icons/AnimatedIcon';
import { useAnchorElement, useAppSelector, useTranslate } from '@/hooks';
import { useDetectMobile } from '@/hooks/useDetectMobile';
import { useAuth } from '@/providers/AuthProvider';
import { selectCurrentUser } from '@/stores/auth';
import { IUserDTO } from '@/types/dto';

import {
  StyledAccountCircleIcon,
  StyledDivider,
  StyledGridBox,
  StyledGridButton,
  StyledGridLabel,
  StyledGridUsername,
  StyledUserFullname,
  StyledUserMenu,
} from './UserMenu.styles';

type UserMenuProps = Record<string, unknown>;

type IUserMenu = {
  /**
   * User item that is displayed on the user menu
   */
  currentUser: IUserDTO;
};

export const ConnectedUserMenu: FC<UserMenuProps> = () => {
  const user = useAppSelector(selectCurrentUser);
  return user && <UserMenu currentUser={user} />;
};

export const UserMenu: FC<IUserMenu> = (props) => {
  const { currentUser } = props;
  const isMobileSize = useDetectMobile();
  const theme = useTheme();
  const translate = useTranslate();
  const { logout } = useAuth();
  const { anchorEl, isOpen, open, close } = useAnchorElement();

  return (
    <>
      <StyledUserMenu onClick={open}>
        <StyledAccountCircleIcon />
        <StyledUserFullname>{currentUser && currentUser.fullname}</StyledUserFullname>
        <AnimatedIcon isActive={isOpen} finalTransform="rotate(180deg) scale(1)">
          <KeyboardArrowDownIcon fontSize="medium" />
        </AnimatedIcon>
      </StyledUserMenu>
      <Menu
        anchorEl={anchorEl}
        open={isOpen}
        onClose={close}
        transitionDuration={theme.transitions.duration.shortest}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Box sx={{ width: 350, height: 'auto' }}>
          <StyledGridBox container rowSpacing={1} columnSpacing={2} p={1}>
            <StyledGridUsername item xs={12}>
              <Typography variant="subtitle2">
                <b>{currentUser?.code}</b>
              </Typography>

              <Typography variant="body2">({currentUser?.code})</Typography>
            </StyledGridUsername>

            <StyledDivider style={{ paddingTop: '8px' }} />

            <StyledGridLabel item xs={4}>
              <Typography variant="body2">{translate.resources.user.code()}</Typography>
            </StyledGridLabel>
            <Grid item xs={8}>
              <Typography variant="body2">: {currentUser?.code}</Typography>
            </Grid>

            <StyledGridLabel item xs={4}>
              <Typography variant="body2">
                {translate.resources.user.department()}
              </Typography>
            </StyledGridLabel>
            <Grid item xs={8}>
              <Typography variant="body2">: {currentUser?.department?.name}</Typography>
            </Grid>

            <StyledGridLabel item xs={4}>
              <Typography variant="body2">{translate.resources.user.title()}</Typography>
            </StyledGridLabel>
            <Grid item xs={8}>
              <Typography variant="body2">: {currentUser?.title}</Typography>
            </Grid>

            <StyledGridLabel item xs={4}>
              <Typography variant="body2">{translate.resources.user.phone()}</Typography>
            </StyledGridLabel>
            <Grid item xs={8}>
              <Typography variant="body2">: {currentUser?.phone}</Typography>
            </Grid>

            <StyledGridLabel item xs={4}>
              <Typography variant="body2">{translate.resources.user.email()}</Typography>
            </StyledGridLabel>
            <Grid item xs={8}>
              <Typography variant="body2">: {currentUser?.email}</Typography>
            </Grid>

            <StyledDivider style={{ paddingTop: '8px' }} />

            <StyledGridButton item xs={12}>
              <Stack
                display={'flex'}
                flexDirection={'row'}
                justifyContent={'space-between'}
              >
                {/**
                 * Tạm ẩn ở mobile vì lỗi style
                 */}
                {!isMobileSize ? <ChangePasswordButtons /> : <></>}
                <MyButton variant="outlined" onClick={logout}>
                  {translate.buttons.logout()}
                </MyButton>
              </Stack>
            </StyledGridButton>
          </StyledGridBox>
        </Box>
      </Menu>
    </>
  );
};

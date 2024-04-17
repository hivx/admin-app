import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useTheme } from '@mui/material';
import React from 'react';

import { MODE_THEME } from '@/config';
import { useToggleTheme, useTranslate } from '@/hooks';

import { StyledIconButtonWithToolTip } from './NavBar';

/**
 * Button chuyển màu chỉ có ở bản VISNAM
 */
const NavBarThemeButton = () => {
  const translate = useTranslate();
  const toggleTheme = useToggleTheme();
  const theme = useTheme();

  const onClickButton = () => {
    const nextTheme =
      theme.palette.mode === MODE_THEME.DARK ? MODE_THEME.VIETRAD_THEME : MODE_THEME.DARK;
    toggleTheme(nextTheme);
  };

  return (
    <StyledIconButtonWithToolTip
      title={translate.tooltip.navbar.button.toggleTheme({
        mode: theme.palette.mode,
      })}
      onClick={onClickButton}
      color="primary"
    >
      {theme.palette.mode === MODE_THEME.DARK ? <Brightness7Icon /> : <Brightness4Icon />}
    </StyledIconButtonWithToolTip>
  );
};

export default NavBarThemeButton;

import { Typography, styled, useTheme } from '@mui/material';
import { FC } from 'react';

import { ItechThemeIcon } from '@/assets/icon';
import { MyRadio } from '@/components/Elements/Inputs/MyRadio';
import { MyMenu } from '@/components/Menu/MyMenu';
import { StyledMenuItem } from '@/components/Menu/StyledMenuItem';
import { MODE_THEME } from '@/config';
import { useAnchorElement, useAppSelector, useToggleTheme } from '@/hooks';

import { StyledIconButtonWithToolTip } from './NavBar';

type ThemeOption = { label: string; color: string };

const THEME_OPTIONS: Partial<Record<MODE_THEME, ThemeOption>> = {
  [MODE_THEME.ITECH_THEME]: {
    label: 'Màu sáng',
    color: '#0e8a72',
  },
  [MODE_THEME.DARK]: {
    label: 'Màu tối',
    color: '#1d1e3a',
  },
} as const;

export const ThemeMenu: FC = () => {
  const theme = useTheme();
  const { anchorEl, isOpen, open, close } = useAnchorElement();
  const toggleTheme = useToggleTheme();
  const modeTheme = useAppSelector((state) => state.theme.themeMode);

  return (
    <>
      <StyledIconButtonWithToolTip
        title={'Thay đổi giao diện'}
        onClick={open}
        color="primary"
      >
        <ItechThemeIcon />
      </StyledIconButtonWithToolTip>
      <MyMenu
        anchorEl={anchorEl}
        open={isOpen}
        onClose={close}
        transitionDuration={theme.transitions.duration.shortest}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        defaultValue={20}
      >
        {Object.entries(THEME_OPTIONS).map(([mode, option]) => (
          <StyledMenuItem
            key={mode}
            selected={false}
            value={mode}
            onClick={() => {
              toggleTheme(mode as MODE_THEME);
              close();
            }}
            title={option.label}
          >
            <StyledIconWrapper>
              <MyRadio checked={modeTheme === mode} compact />
              <StyledThemeItem
                style={{ '--backgroundColor': option.color } as React.CSSProperties}
              />
              <Typography>{option.label}</Typography>
            </StyledIconWrapper>
          </StyledMenuItem>
        ))}
      </MyMenu>
    </>
  );
};

const StyledIconWrapper = styled('div')`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: ${(props) => props.theme.spacing(1)};
`;

const StyledThemeItem = styled(StyledMenuItem)`
  background-color: var(--backgroundColor);
`;

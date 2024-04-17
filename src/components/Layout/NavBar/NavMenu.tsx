import { useTheme } from '@mui/material';
import { FC } from 'react';
import { matchPath, useLocation, useNavigate } from 'react-router-dom';

import { AnimatedIcon } from '@/components/Elements/Icons/AnimatedIcon';
import { MyTooltip } from '@/components/Elements/Tooltip/MyTooltip';
import { MyMenu } from '@/components/Menu/MyMenu';
import { StyledMenuItem } from '@/components/Menu/StyledMenuItem';
import { useAnchorElement, useTranslate } from '@/hooks';
import { MenuItem as IMenuItem } from '@/types';
import { partition } from '@/utils/partition';

import {
  StyledCurrentMenu,
  StyledCurrentMenuLink,
  StyledCurrentMenuTitle,
  StyledMenuButton,
  StyledMenuIcon,
  StyledMenuTitle,
  StyledNavMenu,
} from './NavMenu.styles';

export type INavMenuProps = {
  /**
   * Menu item that is displayed on the nav bar
   */
  currentMenu: IMenuItem | undefined;
  /**
   * Menu items that goes inside the drop down list
   */
  listMenu: IMenuItem[];
};

type INavMenuHOC = {
  /**
   * Unfiltered menu list
   */
  listMenu: IMenuItem[];
};

export const ConnectedNavMenu: FC<INavMenuHOC> = (props) => {
  const { listMenu } = props;
  const { pathname } = useLocation();

  const [matchedMenus, unmatchedMenus] = partition(
    (item) => Boolean(matchPath(`${item.route}/*`, pathname)),
    listMenu,
  );
  return <NavMenu currentMenu={matchedMenus[0]} listMenu={unmatchedMenus} />;
};

export const NavMenu: FC<INavMenuProps> = (props) => {
  const { listMenu, currentMenu } = props;
  const theme = useTheme();
  const translate = useTranslate();
  const navigate = useNavigate();
  const { anchorEl, isOpen, open, close } = useAnchorElement();

  return (
    <StyledNavMenu>
      <StyledCurrentMenu>
        <StyledMenuButton onClick={open}>
          <AnimatedIcon isActive={isOpen} finalTransform="rotate(180deg) scale(0.7)">
            <MyTooltip title={translate.tooltip.navbar.menu()}>
              <StyledMenuIcon fontSize="large" />
            </MyTooltip>
          </AnimatedIcon>
        </StyledMenuButton>
        <StyledCurrentMenuLink to={currentMenu?.route || ''}>
          <StyledMenuButton>
            {currentMenu && (
              <StyledCurrentMenuTitle>
                {translate.pages[currentMenu.name].title()}
              </StyledCurrentMenuTitle>
            )}
          </StyledMenuButton>
        </StyledCurrentMenuLink>
      </StyledCurrentMenu>

      <MyMenu
        anchorEl={anchorEl}
        open={isOpen}
        onClose={close}
        onClick={close}
        transitionDuration={theme.transitions.duration.shortest}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        transformOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        {listMenu.map((menu) => (
          <StyledMenuItem key={menu.name} onClick={() => navigate(menu.route)}>
            <StyledMenuTitle>{translate.pages[menu.name].title()}</StyledMenuTitle>
          </StyledMenuItem>
        ))}
      </MyMenu>
    </StyledNavMenu>
  );
};

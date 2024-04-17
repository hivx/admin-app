import { Box, colors, Stack, styled, useTheme } from '@mui/material';
import { FC, ReactNode } from 'react';
import { useMeasure } from 'react-use';

import { IconButtonWithToolTip } from '@/components/Elements/Buttons/IconButtonWithToolTip';
import { ServerTimeText } from '@/components/ServerTimeText';
import { HOSPITAL_ID } from '@/config';
import { HOSPITAL_IDS } from '@/config/hospitalIDs';
import { ITabItem } from '@/types';
import { MenuItem } from '@/types/menu';
import { filterTransientProps } from '@/utils/filterTransientProps';

import { TabsShell } from '../Tabs/TabShell';

import NavBarThemeButton from './NavBarThemeButton';
import NavBarVideoConferencingButton from './NavBarVideoConferencingButton';
import NavBarViewStatisticButton from './NavBarViewStatisticButton';
import { INavMenuProps, ConnectedNavMenu } from './NavMenu';
import { ThemeMenu } from './ThemeMenu';
import { UserConfigButton } from './UserConfig/UserConfigButton';
import { ConnectedUserMenu } from './UserMenu';
import { VersionTooltip } from './VersionTooltip';

type INavBarProps = {
  logo: string;
  listTabs?: ITabItem[];
  listMenu: MenuItem[];
  renderTabs?: (listTabs: ITabItem[]) => ReactNode;
  renderMenu?: (menuProps: Partial<INavMenuProps>) => ReactNode;
};

export const NavBar: FC<INavBarProps> = (props) => {
  const { renderMenu, listTabs, renderTabs } = props;
  const theme = useTheme();
  // measure width to determine max width of Menu and Tab area
  const [topRightElementsRef, { width }] = useMeasure<HTMLDivElement>();

  return (
    <StyledNavBar sx={{ boxShadow: 1 }}>
      <Box
        sx={{
          minWidth: theme.pacs?.layout.sidebarWidth,
          width: theme.pacs?.layout.sidebarWidth,
        }}
      >
        <VersionTooltip>
          <StyledLogo src={props.logo} alt="logo" />
        </VersionTooltip>
      </Box>
      <StyledMenuTabsUserContainer $topRightElementsWidth={width}>
        <StyledMenuTabsContainer direction="row" spacing={1}>
          {renderMenu ? (
            renderMenu({ listMenu: props.listMenu })
          ) : (
            <ConnectedNavMenu listMenu={props.listMenu} />
          )}
          {renderTabs
            ? listTabs && renderTabs(listTabs)
            : listTabs && <TabsShell listTabs={listTabs} />}
        </StyledMenuTabsContainer>
        <StyledTopRightElementsContainer ref={topRightElementsRef}>
          {/**
           * Button Video Conferencing
           */}
          <NavBarVideoConferencingButton />
          {/**
           * Button View Statistic
           */}
          <NavBarViewStatisticButton />
          {/**
           * Button User Config
           */}
          <UserConfigButton />
          {/* <NavBarConsultantMeetingButton /> */}
          {/**
           * Button Theme: change theme dark/light
           */}
          {HOSPITAL_ID === HOSPITAL_IDS.VISNAM ? <NavBarThemeButton /> : <ThemeMenu />}

          {/**
           * Button User menu
           */}
          <ConnectedUserMenu />
          {/* Server time */}
          <ServerTimeText />
        </StyledTopRightElementsContainer>
      </StyledMenuTabsUserContainer>
    </StyledNavBar>
  );
};

/**
 * Styles
 */

const StyledNavBar = styled('div')`
  display: flex;
  width: 100vw;
  max-width: 100vw;
  position: relative;
  max-height: ${(props) => props.theme.pacs?.layout.navBarHeight};
  border-bottom: 1px solid ${colors.grey[400]};
  flex-wrap: nowrap;
  z-index: ${(props) => props.theme.zIndex.drawer};
`;

const StyledLogo = styled('img')`
  width: 100%;
  max-width: 100%;
  height: 100%;
  max-height: 100%;
  padding: ${(props) => props.theme.spacing('5px', 1)};
  object-fit: contain;
  background-color: ${(props) => props.theme.palette.background.paper};
`;

const StyledTopRightElementsContainer = styled('div')`
  padding: 0 ${(props) => props.theme.spacing(2)};
  display: flex;
  flex-direction: row;
  height: 100%;
  position: absolute;
  top: 0;
  right: 0;
  align-items: center;
  background-color: ${(props) => props.theme.palette.background.paper};
`;

const StyledMenuTabsUserContainer = styled('div', filterTransientProps)<{
  $topRightElementsWidth: number;
}>`
  display: flex;
  flex-direction: row;
  flex: 1;
  max-width: calc(
    100vw - ${(props) => props.theme.pacs?.layout.sidebarWidth} -
      ${(props) => props.$topRightElementsWidth}px - ${(props) => props.theme.spacing(4)}
  );
  background-color: ${(props) => props.theme.palette.background.paper};
`;

const StyledMenuTabsContainer = styled(Stack)`
  width: 100%;
  height: 100%;
  overflow: hidden;
`;

export const StyledIconButtonWithToolTip = styled(IconButtonWithToolTip)`
  svg {
    color: ${(props) => props.theme.pacs?.customColors.iconDefaultColor};
  }
  &:hover {
    svg {
      color: ${(props) => props.theme.pacs?.customColors.textIconHoverColor};
    }
  }
`;

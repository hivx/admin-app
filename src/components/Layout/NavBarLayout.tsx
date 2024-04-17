import { styled } from '@mui/material';
import * as React from 'react';
import { useMatch } from 'react-router-dom';

import { ROUTE_ORDER_LIST } from '@/features/order';
import { useAppSelector } from '@/hooks';
import { useGetHospitalLogo } from '@/hooks/useGetHospitalLogo';
import { useGetMenuModules } from '@/hooks/useGetUserModules';
import { selectTabList } from '@/stores/tabs/tabSlice';
import { ITabItem } from '@/types';

import { NavBar } from './NavBar/NavBar';

type NarBarLayoutProps = {
  children?: React.ReactNode;
};

const StyledNavBarLayout = styled('div')`
  min-height: 100vh;
  min-width: 100vw;
  max-width: 100vw;
  display: grid;
  grid-template-rows: auto 1fr;
`;

const MainContentContainer = styled('div')`
  max-height: ${(props) => `calc(100vh - ${props.theme.pacs?.layout.navBarHeight})`};
`;

/**
 * Contains NavBar and the page contents of protected route
 */
export const NavBarLayout = ({ children }: NarBarLayoutProps) => {
  return (
    <StyledNavBarLayout>
      <ConnectedNavBar />
      <MainContentContainer>{children}</MainContentContainer>
    </StyledNavBarLayout>
  );
};

const EMPTY_ARR: ITabItem[] = [];

const ConnectedNavBar = () => {
  const { navbarLogo } = useGetHospitalLogo();
  const tabs = useAppSelector(selectTabList);
  const listMenu = useGetMenuModules();

  /**
   * If page is order page => show tab list
   */
  const isShowTab = Boolean(useMatch(`${ROUTE_ORDER_LIST}/*`));
  return (
    <NavBar
      logo={navbarLogo}
      listMenu={listMenu}
      listTabs={isShowTab ? tabs : EMPTY_ARR}
    />
  );
};

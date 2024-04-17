import { styled, MenuListProps, MenuList } from '@mui/material';
import { forwardRef } from 'react';

import { globalStyles } from '@/providers/ThemeProvider';

export type MyMenuListProps = MenuListProps;

const StyledMenuList = styled(MenuList)`
  ${globalStyles.menuList}// use global styles so that we can compose with MyMenu
`;

export const MyMenuList = forwardRef<HTMLUListElement, MyMenuListProps>((props, ref) => {
  return <StyledMenuList {...props} ref={ref} />;
});

MyMenuList.displayName = 'MuiMenu';

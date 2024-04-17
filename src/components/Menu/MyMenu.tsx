import { styled, Menu, MenuProps } from '@mui/material';
import { forwardRef } from 'react';

import { globalStyles } from '@/providers/ThemeProvider';

export type IMyMenuProps = MenuProps;

const StyledMenu = styled(Menu)`
  .MuiList-root {
    ${globalStyles.menuList};
  }
`;

export const MyMenu = forwardRef<HTMLDivElement, IMyMenuProps>((props, ref) => {
  return <StyledMenu ref={ref} {...props} />;
});

MyMenu.displayName = 'MuiMenu';

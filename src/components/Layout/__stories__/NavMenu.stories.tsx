import { Box } from '@mui/material';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { MenuItem } from '@/types';

import { NavMenu } from '../NavBar/NavMenu';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Layout/NavMenu',
  component: NavMenu,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof NavMenu>;

const mockTestMenus: MenuItem[] = [
  {
    name: 'orderList',
    route: '.',
  },
  {
    name: 'registrationList',
    route: '.',
  },
];

export const NavMenuUI: ComponentStory<typeof NavMenu> = (args) => {
  return (
    <Box sx={{ height: 40 }}>
      <NavMenu {...args} />
    </Box>
  );
};

NavMenuUI.args = {
  currentMenu: mockTestMenus[0],
  listMenu: mockTestMenus,
};

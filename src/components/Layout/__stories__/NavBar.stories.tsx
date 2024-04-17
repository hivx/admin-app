import { useTheme } from '@mui/material';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { AuthProvider } from '@/providers/AuthProvider';
import { MenuItem } from '@/types';

import { NavBar } from '../NavBar/NavBar';
import { NavMenu } from '../NavBar/NavMenu';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Layout/NavBar',
  component: NavBar,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
  decorators: [
    (Story) => (
      <AuthProvider>
        <Story />
      </AuthProvider>
    ),
  ],
} as ComponentMeta<typeof NavBar>;

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

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof NavBar> = (args) => {
  const theme = useTheme();
  return (
    <NavBar
      {...args}
      logo={theme.pacs?.images.navbar || ''}
      renderMenu={() => (
        <NavMenu currentMenu={mockTestMenus[0]} listMenu={mockTestMenus} />
      )}
    />
  );
};

export const Default = Template.bind({});
Default.args = {
  listMenu: mockTestMenus,
};

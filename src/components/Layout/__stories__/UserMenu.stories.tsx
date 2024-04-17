import { Box } from '@mui/material';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import { AuthProvider } from '@/providers/AuthProvider';
import { MOCK_SYSADMIN_USER } from '@/test/mock-data-stable';

import { UserMenu } from '../NavBar/UserMenu';

export default {
  title: 'Layout/UserMenu',
  component: UserMenu,
  decorators: [
    (Story) => (
      <AuthProvider>
        <Story />
      </AuthProvider>
    ),
  ],
} as ComponentMeta<typeof UserMenu>;

const Template: ComponentStory<typeof UserMenu> = (args) => (
  <Box sx={{ height: '30px' }}>
    <UserMenu {...args} />
  </Box>
);

export const UserMenuUI = Template.bind({});
UserMenuUI.args = {
  currentUser: MOCK_SYSADMIN_USER,
};

import { ComponentStory, ComponentMeta } from '@storybook/react';

import { NavBarLayout } from '@/components/Layout/NavBarLayout';
import { AuthProvider } from '@/providers/AuthProvider';

import { RegistrationList } from '../../routes/RegistrationList';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Pages/RegistrationList',
  component: RegistrationList,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
  decorators: [
    (Story) => (
      <AuthProvider>
        <NavBarLayout>
          <Story />
        </NavBarLayout>
      </AuthProvider>
    ),
  ],
} as ComponentMeta<typeof RegistrationList>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof RegistrationList> = () => <RegistrationList />;

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {};
Default.parameters = {
  layout: 'fullscreen',
};

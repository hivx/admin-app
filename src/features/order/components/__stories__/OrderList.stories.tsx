import { ComponentStory, ComponentMeta } from '@storybook/react';

import { NavBarLayout } from '@/components/Layout/NavBarLayout';
import { AuthProvider } from '@/providers/AuthProvider';

import { OrderListPage } from '../../routes/OrderListPage';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Pages/OrderList',
  component: OrderListPage,
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
} as ComponentMeta<typeof OrderListPage>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof OrderListPage> = () => <OrderListPage />;

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {};
Default.parameters = {
  layout: 'fullscreen',
};

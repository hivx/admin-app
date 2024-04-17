import { ComponentMeta, ComponentStory } from '@storybook/react';

import { MyPagination } from '../Navigation';

export default {
  title: 'Navigation/MyPagination',
  component: MyPagination,
} as ComponentMeta<typeof MyPagination>;

const Template: ComponentStory<typeof MyPagination> = (args) => (
  <MyPagination {...args} />
);

export const Basic = Template.bind({});
Basic.args = {};

export const Disabled = Template.bind({});
Disabled.args = {
  count: 10,
  disabled: true,
};

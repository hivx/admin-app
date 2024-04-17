import { ComponentMeta, ComponentStory } from '@storybook/react';

import { MyLink } from '../Navigation';

export default {
  title: 'Navigation/MyLink',
  component: MyLink,
  argTypes: {},
} as ComponentMeta<typeof MyLink>;

const Template: ComponentStory<typeof MyLink> = (args) => <MyLink {...args} />;

export const Text = Template.bind({});
Text.args = {
  children: 'Text',
};

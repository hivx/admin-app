import { ComponentStory, ComponentMeta } from '@storybook/react';

import { MyButtonGroup, MyButton } from '../Buttons';

export default {
  title: 'Buttons/MyButtonGroup',
  component: MyButtonGroup,
  argTypes: {},
} as ComponentMeta<typeof MyButtonGroup>;

const Template: ComponentStory<typeof MyButtonGroup> = (args) => (
  <MyButtonGroup {...args}>
    <MyButton>One</MyButton>
    <MyButton>Two</MyButton>
    <MyButton>Three</MyButton>
  </MyButtonGroup>
);

export const Outlined = Template.bind({});
Outlined.args = {
  variant: 'outlined',
  children: 'Button',
};

export const Color = Template.bind({});
Color.args = {
  color: 'secondary',
  sx: {
    bgcolor: 'background.paper',
    boxShadow: 1,
    borderRadius: 2,
  },
};

export const VerticalGroup = Template.bind({});
VerticalGroup.args = {
  orientation: 'vertical',
  variant: 'contained',
};

import { CircularProgress } from '@mui/material';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { MyButton, MyButtonDefaults } from '../Buttons';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Buttons/MyButton',
  component: MyButton,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof MyButton>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof MyButton> = (args) => <MyButton {...args} />;

export const Contained = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Contained.args = {
  ...MyButtonDefaults,
  variant: 'contained',
  children: 'Button',
};

export const Outlined = Template.bind({});
Outlined.args = {
  ...MyButtonDefaults,
  variant: 'outlined',
  children: 'Button',
};

export const Text = Template.bind({});
Text.args = {
  ...MyButtonDefaults,
  variant: 'text',
  children: 'Button',
};

export const DisabledLoading: ComponentStory<typeof MyButton> = (args) => (
  <MyButton {...args}>
    <CircularProgress size={20} />
  </MyButton>
);

DisabledLoading.args = {
  ...MyButtonDefaults,
  disabled: true,
  variant: 'contained',
};

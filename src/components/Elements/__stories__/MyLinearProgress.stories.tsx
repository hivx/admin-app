import { ComponentMeta, ComponentStory } from '@storybook/react';

import { MyLinearProgress, DefaultLinearProgress } from '../Feedback';

export default {
  title: 'Feedback/MyLinearProgress',
  component: MyLinearProgress,
} as ComponentMeta<typeof MyLinearProgress>;

const Template: ComponentStory<typeof MyLinearProgress> = (args) => (
  <MyLinearProgress {...args} />
);

export const LinearSecondary = Template.bind({});
LinearSecondary.args = {
  ...DefaultLinearProgress,
  color: 'secondary',
};

export const LinearSuccess = Template.bind({});
LinearSuccess.args = {
  ...DefaultLinearProgress,
  color: 'success',
};

export const LinearInherit = Template.bind({});
LinearSecondary.args = {
  ...DefaultLinearProgress,
  color: 'inherit',
};

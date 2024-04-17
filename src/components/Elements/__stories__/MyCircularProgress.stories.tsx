import { ComponentMeta, ComponentStory } from '@storybook/react';

import { MyCircularProgress, DefaultCircularProgress } from '../Feedback';

export default {
  title: 'Feedback/MyCircularProgress',
  component: MyCircularProgress,
} as ComponentMeta<typeof MyCircularProgress>;

const Template: ComponentStory<typeof MyCircularProgress> = (args) => (
  <MyCircularProgress {...args} />
);

export const CircularSecondary = Template.bind({});
CircularSecondary.args = {
  ...DefaultCircularProgress,
  color: 'secondary',
};

export const CircularSucces = Template.bind({});
CircularSucces.args = {
  ...DefaultCircularProgress,
  color: 'success',
};

export const CircularInherit = Template.bind({});
CircularSecondary.args = {
  ...DefaultCircularProgress,
  color: 'inherit',
};

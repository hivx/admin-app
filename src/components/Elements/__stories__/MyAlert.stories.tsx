import { ComponentMeta, ComponentStory } from '@storybook/react';

import { MyAlert, MyAlertDefault } from '../Feedback';

export default {
  title: 'Feedback/MyAlert',
  component: MyAlert,
} as ComponentMeta<typeof MyAlert>;

const Template: ComponentStory<typeof MyAlert> = (args) => <MyAlert {...args} />;

export const MyAlertError = Template.bind({});
MyAlertError.args = {
  ...MyAlertDefault,
  children: 'Alert Error',
  severity: 'error',
};

export const MyAlertErrorFilled = Template.bind({});
MyAlertErrorFilled.args = {
  ...MyAlertDefault,
  children: 'Alert Error',
  severity: 'error',
  variant: 'filled',
};

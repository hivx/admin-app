import { ComponentStory, ComponentMeta } from '@storybook/react';

import { MySwitch } from '../Inputs/MySwitch';

export default {
  title: 'Inputs/MySwitch',
  component: MySwitch,
  argTypes: {},
} as ComponentMeta<typeof MySwitch>;

const Template: ComponentStory<typeof MySwitch> = (args) => {
  return <MySwitch {...args} />;
};

export const SwitchPrimary = Template.bind({});
SwitchPrimary.args = {
  color: 'primary',
};

export const SwitchSecondary = Template.bind({});
SwitchSecondary.args = {
  color: 'secondary',
};

export const SwitchSize = Template.bind({});
SwitchSize.args = {
  size: 'small',
};

import { ComponentStory, ComponentMeta } from '@storybook/react';

import { MyCheckbox } from '../Inputs/MyCheckbox';

export default {
  title: 'Inputs/MyCheckbox',
  component: MyCheckbox,
  argTypes: {},
} as ComponentMeta<typeof MyCheckbox>;

const Template: ComponentStory<typeof MyCheckbox> = (args) => {
  return <MyCheckbox {...args} />;
};

export const CheckboxSuccess = Template.bind({});
CheckboxSuccess.args = {
  color: 'success',
};

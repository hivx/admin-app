import { ComponentStory, ComponentMeta } from '@storybook/react';

import CancelButton from '../Buttons/CancelButton';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Buttons/CancelButton',
  component: CancelButton,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof CancelButton>;

export const Default: ComponentStory<typeof CancelButton> = (args) => (
  <CancelButton {...args}></CancelButton>
);

Default.args = {
  children: 'Cancel',
};

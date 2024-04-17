import { ComponentMeta, ComponentStory } from '@storybook/react';

import { MySnackbar, SnackbarDefault } from '../Feedback';

export default {
  title: 'Feedback/MySnackbar',
  component: MySnackbar,
} as ComponentMeta<typeof MySnackbar>;

const Template: ComponentStory<typeof MySnackbar> = (args) => <MySnackbar {...args} />;

export const SnackbarTopRight = Template.bind({});
SnackbarTopRight.args = {
  ...SnackbarDefault,
  anchorOrigin: { vertical: 'top', horizontal: 'right' },
  message: 'TOP RIGHT',
  open: true,
};

export const SnackbarTopLeft = Template.bind({});
SnackbarTopLeft.args = {
  ...SnackbarDefault,
  anchorOrigin: { vertical: 'top', horizontal: 'left' },
  message: 'TOP LEFT',
  open: true,
};

export const SnackbarBottomRight = Template.bind({});
SnackbarBottomRight.args = {
  ...SnackbarDefault,
  anchorOrigin: { vertical: 'bottom', horizontal: 'right' },
  message: 'BOTTOM RIGHT',
  open: true,
};

export const SnackbarBottomLeft = Template.bind({});
SnackbarBottomLeft.args = {
  ...SnackbarDefault,
  anchorOrigin: { vertical: 'bottom', horizontal: 'left' },
  message: 'BOTTOM LEFT',
  open: true,
};

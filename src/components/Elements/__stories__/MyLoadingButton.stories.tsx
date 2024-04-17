import { ComponentStory, ComponentMeta } from '@storybook/react';

import { MyButton, MyLoadingButton } from '../Buttons';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Buttons/MyLoadingButton',
  component: MyLoadingButton,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof MyLoadingButton>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof MyLoadingButton> = (args) => (
  <MyLoadingButton {...args} />
);

export const Loading = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Loading.args = {
  loading: true,
  //   variant: 'contained',
  //   children: 'Button',
};

const LoadingWithButtonTemplate: ComponentStory<typeof MyLoadingButton> = (args) => (
  <MyButton variant="contained">
    <MyLoadingButton {...args} />
  </MyButton>
);

export const LoadingWithButton = LoadingWithButtonTemplate.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
LoadingWithButton.args = {
  loading: true,
  //   variant: 'contained',
  //   children: 'Button',
};

// export const CustomLoadingIndicator = Template.bind({});
// CustomLoadingIndicator.args = {
//   loadingIndicator: <LinearProgress />,
// };

// export const Text = Template.bind({});
// Text.args = {
//   //   variant: 'text',
//   //   children: 'Button',
// };

import { Box } from '@mui/system';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { FullPageSpinner } from '../FullPageSpinner';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Layout/FullPageSpinner',
  component: FullPageSpinner,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: {
      control: 'color',
    },
  },
} as ComponentMeta<typeof FullPageSpinner>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const WithContainerTemplate: ComponentStory<typeof FullPageSpinner> = (args) => (
  <Box sx={{ width: 500, height: 500, border: '1px solid red' }} m={0} p={0}>
    <FullPageSpinner {...args} />
  </Box>
);

const Template: ComponentStory<typeof FullPageSpinner> = (args) => (
  <FullPageSpinner {...args} />
);

export const Default = Template.bind({});
Default.args = {
  text: 'Đang tải...',
};

/**
 * Component is rendered inside a red container
 */
export const WithContainer = WithContainerTemplate.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
WithContainer.args = {
  text: 'Đang tải...',
};

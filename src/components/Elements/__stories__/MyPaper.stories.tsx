import { Box } from '@mui/material';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import { MyPaper } from '../Surfaces';

export default {
  title: 'Surfaces/MyPaper',
  component: MyPaper,
} as ComponentMeta<typeof MyPaper>;

const Template: ComponentStory<typeof MyPaper> = (args) => (
  <Box
    sx={{
      display: 'flex',
      flexWrap: 'wrap',
      '& > :not(style)': {
        m: 1,
        width: 128,
        height: 128,
      },
    }}
  >
    <MyPaper {...args} />
  </Box>
);

export const Basic = Template.bind({});
Basic.args = {};

export const Outlined = Template.bind({});
Outlined.args = {
  variant: 'outlined',
};

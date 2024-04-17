import { ComponentMeta, ComponentStory } from '@storybook/react';

import { MyButton } from '../Buttons';
import { MyTooltip } from '../Tooltip/MyTooltip';

export default {
  title: 'Tooltip/MyTooltip',
  component: MyTooltip,
} as ComponentMeta<typeof MyTooltip>;

const Template: ComponentStory<typeof MyTooltip> = (args) => {
  return (
    <MyButton>
      <MyTooltip {...args}>
        <div>Click me!</div>
      </MyTooltip>
    </MyButton>
  );
};

export const Default = Template.bind({});
Default.args = {
  title: 'add',
};

export const StyledTooltip = Template.bind({});
StyledTooltip.args = {
  title: 'add',
  componentsProps: {
    tooltip: {
      sx: {
        color: 'purple',
        backgroundColor: 'lightblue',
        fontSize: '2em',
      },
    },
    arrow: {
      sx: {
        color: 'lightblue',
      },
    },
  },
};

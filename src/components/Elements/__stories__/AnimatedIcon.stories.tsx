import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { useState } from 'react';

import { StyledMenuIcon } from '@/components/Layout/NavBar/NavMenu.styles';

import { AnimatedIcon, ANIMATED_ICON_DEFAULT_PROPS } from '../Icons/AnimatedIcon';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Icons/AnimatedIcon',
  component: AnimatedIcon,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof AnimatedIcon>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
export const MenuIcon: ComponentStory<typeof AnimatedIcon> = (args) => {
  const [isActive, setIsActive] = useState<boolean>(false);
  return (
    <>
      <AnimatedIcon {...args} isActive={isActive}>
        <StyledMenuIcon fontSize="large" />
      </AnimatedIcon>
      <div>
        <button onClick={() => setIsActive((e) => !e)}>Click to animate</button>
      </div>
      <div>
        <span>isActive: {`${isActive}`}</span>
      </div>
    </>
  );
};

// More on args: https://storybook.js.org/docs/react/writing-stories/args
MenuIcon.args = {
  ...ANIMATED_ICON_DEFAULT_PROPS,
};

export const KeyboardDown: ComponentStory<typeof AnimatedIcon> = (args) => {
  const [isActive, setIsActive] = useState<boolean>(false);
  return (
    <>
      <AnimatedIcon {...args} isActive={isActive}>
        <KeyboardArrowDownIcon fontSize="large" color="primary" />
      </AnimatedIcon>
      <div>
        <button onClick={() => setIsActive((e) => !e)}>Click to animate</button>
      </div>
      <div>
        <span>isActive: {`${isActive}`}</span>
      </div>
    </>
  );
};

// More on args: https://storybook.js.org/docs/react/writing-stories/args
KeyboardDown.args = {
  ...ANIMATED_ICON_DEFAULT_PROPS,
  finalTransform: 'rotate(90deg) scale(1.0)',
};

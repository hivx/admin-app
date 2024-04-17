import { FormControlLabel, Radio } from '@mui/material';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { SetStateAction, useState } from 'react';

import { MyRadioGroup } from '../Inputs/MyRadioGroup';

export default {
  title: 'Inputs/MyRadioGroup',
  component: MyRadioGroup,
  argTypes: {},
} as ComponentMeta<typeof MyRadioGroup>;

const Template: ComponentStory<typeof MyRadioGroup> = (args) => {
  const [value, setValue] = useState('male');

  const handleChange = (event: { target: { value: SetStateAction<string> } }) => {
    setValue(event.target.value);
  };

  return (
    <MyRadioGroup
      aria-labelledby="demo-controlled-radio-buttons-group"
      name="controlled-radio-buttons-group"
      value={value}
      onChange={handleChange}
      {...args}
    >
      <FormControlLabel value="female" control={<Radio />} label="Female" />
      <FormControlLabel value="male" control={<Radio />} label="Male" />
    </MyRadioGroup>
  );
};

export const RadioGroupDirection = Template.bind({});
RadioGroupDirection.args = {
  row: true,
};

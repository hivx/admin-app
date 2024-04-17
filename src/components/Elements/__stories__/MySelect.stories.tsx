import { MenuItem, SelectChangeEvent } from '@mui/material';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import * as React from 'react';

import { MySelect } from '../Inputs/MySelect';

export default {
  title: 'Inputs/MySelect',
  component: MySelect,
  argTypes: {},
} as ComponentMeta<typeof MySelect>;

const Template: ComponentStory<typeof MySelect> = (args) => {
  const [age, setAge] = React.useState<string | number>('');

  const handleChange = (event: SelectChangeEvent<typeof age>) => {
    setAge(event.target.value);
  };

  return (
    <MySelect<typeof age>
      labelId="demo-simple-select-label"
      id="demo-simple-select"
      value={age}
      label="Age"
      onChange={handleChange}
      color={args.color}
      size={args.size}
    >
      <MenuItem value={10}>Ten</MenuItem>
      <MenuItem value={20}>Twenty</MenuItem>
      <MenuItem value={30}>Thirty</MenuItem>
    </MySelect>
  );
};

export const SelectSuccess = Template.bind({});
SelectSuccess.args = {
  color: 'success',
};

export const SelectSize = Template.bind({});
SelectSize.args = {
  size: 'small',
};

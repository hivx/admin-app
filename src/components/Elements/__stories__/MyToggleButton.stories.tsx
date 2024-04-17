import Check from '@mui/icons-material/Check';
import { ToggleButtonGroup } from '@mui/material';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { useState } from 'react';

import { MyToggleButton } from '../Buttons';
export default {
  title: 'Buttons/MyToggleButton',
  component: MyToggleButton,
} as ComponentMeta<typeof MyToggleButton>;

export const ToggleButtonNoEmpty: ComponentStory<typeof ToggleButtonGroup> = (args) => {
  const [value, setValue] = useState<string>('A');

  const handleChangeValue = (
    event: React.MouseEvent<HTMLElement>,
    value: string | null,
  ) => {
    if (value !== null) {
      setValue(value);
    }
  };

  return (
    <ToggleButtonGroup
      {...args}
      value={value}
      exclusive
      onChange={handleChangeValue}
      aria-label="device"
    >
      <MyToggleButton value="A">A</MyToggleButton>
      <MyToggleButton value="B">B</MyToggleButton>
      <MyToggleButton value="C">C</MyToggleButton>
      <MyToggleButton value="D">D</MyToggleButton>
      <MyToggleButton value="E">E</MyToggleButton>
    </ToggleButtonGroup>
  );
};

export const ToggleButtonCheck: ComponentStory<typeof MyToggleButton> = (args) => {
  const [selected, setSelected] = useState(false);

  const handleOnChange = () => {
    setSelected((pre) => !pre);
  };
  return (
    <MyToggleButton
      {...args}
      color="success"
      selected={selected}
      onClick={handleOnChange}
      value={selected}
    >
      <Check />
    </MyToggleButton>
  );
};

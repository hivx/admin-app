import { Tab } from '@mui/material';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import { SyntheticEvent, useState } from 'react';

import { MyTabs } from '../Navigation';

export default {
  title: 'Navigation/MyTabs',
  component: MyTabs,
} as ComponentMeta<typeof MyTabs>;

const Template: ComponentStory<typeof MyTabs> = (args) => {
  const [tabValue, setTabValue] = useState<string>('tab-one');

  return (
    <MyTabs
      {...args}
      value={tabValue}
      onChange={(event: SyntheticEvent<Element, Event>, value: string) =>
        setTabValue(() => value)
      }
    >
      <Tab label="Tab One" value="tab-one" />
      <Tab label="Tab Two" value="tab-two" />
      <Tab label="Tab Three" value="tab-three" />
    </MyTabs>
  );
};

export const Basic = Template.bind({});
Basic.args = {};

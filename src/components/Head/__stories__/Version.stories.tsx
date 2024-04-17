import { ComponentStory, ComponentMeta } from '@storybook/react';

import version from '@/version';

import packageJson from '../../../../package.json';

const Version = () => (
  <h1>
    {version} - {packageJson.variant ? packageJson.variant : ''}
  </h1>
);
// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Version',
  component: Version,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof Version>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Version> = () => <Version />;

export const Default = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Default.args = {};

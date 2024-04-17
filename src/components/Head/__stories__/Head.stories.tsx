import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';

import { Head } from '../Head';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Head/Head',
  component: Head,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof Head>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Head> = (args) => (
  <>
    <span>
      This component modifies the page&apos;s title and favicon, it doesn&apos;t have an
      effect on Storybook
    </span>
    <Head {...args} />
  </>
);

export const LoginHeader = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
LoginHeader.args = {
  title: 'Đăng nhập',
};

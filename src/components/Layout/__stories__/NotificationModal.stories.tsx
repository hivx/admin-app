import { Modal } from '@mui/material';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { useState } from 'react';

import { NotificationModalContent } from '@/components/Elements/Modal/NotificationModalContent';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Layout/NotificationModalContent',
  component: NotificationModalContent,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof NotificationModalContent>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const DefaultTemplate: ComponentStory<typeof NotificationModalContent> = (args) => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <>
      <button onClick={() => setOpen(true)}>Open Modal</button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <NotificationModalContent {...args} onClose={() => setOpen(false)} />
      </Modal>
    </>
  );
};

export const Info = DefaultTemplate.bind({});

Info.args = {
  message: 'This is an Info modal',
  options: {
    variant: 'info',
  },
};

export const Error = DefaultTemplate.bind({});

Error.args = {
  message: 'This is an Error modal',
  options: {
    variant: 'error',
  },
};

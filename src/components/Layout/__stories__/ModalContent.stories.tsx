import { Modal, Typography } from '@mui/material';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { useState } from 'react';

import { ModalContent } from '@/components/Elements/Modal/ModalContent';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Layout/ModalContent',
  component: ModalContent,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof ModalContent>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const DefaultTemplate: ComponentStory<typeof ModalContent> = (args) => {
  const [open, setOpen] = useState<boolean>(false);
  return (
    <>
      <button onClick={() => setOpen(true)}>Open Modal</button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalContent {...args} />
      </Modal>
    </>
  );
};

export const Default = DefaultTemplate.bind({});
Default.args = {
  height: '300px',
  width: '300px',
  title: 'Modal title',
  renderBody: () => <Typography>Modal body</Typography>,
  renderFooter: () => <Typography>Modal footer</Typography>,
};

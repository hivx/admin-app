import { Box } from '@mui/material';
import { ComponentStory, ComponentMeta } from '@storybook/react';

import { StyledTableContainerWithCollapsiblePanel } from '@/components/Table/MyTable.styles';

import { CollapsiblePanel } from '../CollapsiblePanel';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Surfaces/CollapsiblePanel',
  component: CollapsiblePanel,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {},
} as ComponentMeta<typeof CollapsiblePanel>;

export const Default: ComponentStory<typeof CollapsiblePanel> = (args) => {
  return (
    <StyledTableContainerWithCollapsiblePanel>
      <Box
        sx={{
          width: '100%',
          height: '500px',
          background: 'grey',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        CONTENT
      </Box>
      <CollapsiblePanel {...args}>Collapsible content</CollapsiblePanel>
    </StyledTableContainerWithCollapsiblePanel>
  );
};

Default.args = {
  title: 'My collapsible panel',
};

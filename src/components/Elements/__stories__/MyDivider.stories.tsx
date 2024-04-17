import { Box, List, ListItem, ListItemText } from '@mui/material';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import { MyDivider } from '../DataDisplay';

export default {
  title: 'DataDisplay/MyDivider',
  component: MyDivider,
} as ComponentMeta<typeof MyDivider>;

const Template: ComponentStory<typeof MyDivider> = (args) => (
  <Box sx={{ maxWidth: 275 }}>
    <List component="nav" aria-label="mailbox folders">
      <ListItem button>
        <ListItemText primary="Inbox" />
      </ListItem>
      <MyDivider {...args} />
      <ListItem button>
        <ListItemText primary="Drafts" />
      </ListItem>
      <MyDivider {...args} />
      <ListItem button>
        <ListItemText primary="Trash" />
      </ListItem>
      <MyDivider {...args} light />
      <ListItem button>
        <ListItemText primary="Spam" />
      </ListItem>
    </List>
  </Box>
);

export const ListDivider = Template.bind({});
ListDivider.args = {};

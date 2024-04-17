import { CardActions, CardContent, Typography } from '@mui/material';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import { MyButton } from '../Buttons';
import { MyCard } from '../Surfaces';

export default {
  title: 'Surfaces/MyCard',
  component: MyCard,
} as ComponentMeta<typeof MyCard>;

const Template: ComponentStory<typeof MyCard> = (args) => (
  <MyCard {...args}>
    <CardContent>
      <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        Word of the Day
      </Typography>
      <Typography variant="body2">
        well meaning and kindly.
        <br />
        {'"a benevolent smile"'}
      </Typography>
    </CardContent>
    <CardActions>
      <MyButton size="small">Learn More</MyButton>
    </CardActions>
  </MyCard>
);

export const Basic = Template.bind({});
Basic.args = {};

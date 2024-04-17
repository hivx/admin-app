import ExpandMore from '@mui/icons-material/ExpandMore';
import { AccordionSummary, Typography, AccordionDetails } from '@mui/material';
import { ComponentMeta, ComponentStory } from '@storybook/react';

import { MyAccordion } from '../Surfaces';

export default {
  title: 'Surfaces/MyAccordion',
  component: MyAccordion,
} as ComponentMeta<typeof MyAccordion>;

export const DefaultAccordion: ComponentStory<typeof MyAccordion> = () => (
  <>
    <MyAccordion>
      <AccordionSummary
        expandIcon={<ExpandMore />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography>Accordion 1</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>1</Typography>
      </AccordionDetails>
    </MyAccordion>
    <MyAccordion>
      <AccordionSummary
        expandIcon={<ExpandMore />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography>Accordion 2</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>1</Typography>
      </AccordionDetails>
    </MyAccordion>
    <MyAccordion>
      <AccordionSummary
        expandIcon={<ExpandMore />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography>Accordion 3</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>2</Typography>
      </AccordionDetails>
    </MyAccordion>
  </>
);

export const DisableAccordion: ComponentStory<typeof MyAccordion> = () => (
  <>
    <MyAccordion disabled>
      <AccordionSummary
        expandIcon={<ExpandMore />}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography>Accordion disable</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Typography>3</Typography>
      </AccordionDetails>
    </MyAccordion>
  </>
);

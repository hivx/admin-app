import { Accordion, AccordionProps, styled } from '@mui/material';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface IMyAccordionProps extends AccordionProps {}

const StyledAccordion = styled(Accordion)``;

export const MyAccordionDefault: Omit<IMyAccordionProps, 'children'> = {};

export const MyAccordion = (props: IMyAccordionProps) => {
  return (
    <StyledAccordion {...MyAccordionDefault} {...props}>
      {props.children}
    </StyledAccordion>
  );
};

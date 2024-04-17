import { styled } from '@mui/material';

type SummaryOrderItemProps = {
  title: string;
  value: number;
  color?: string;
};

/**
 * This component used for show data order summary of one type
 *
 */
export const SummaryOrderItem = ({ title, value, color }: SummaryOrderItemProps) => {
  return (
    <StyledContainer style={{ color }}>
      <StyledTitle>{title}</StyledTitle>
      <StyledValue>{value}</StyledValue>
    </StyledContainer>
  );
};

const StyledContainer = styled('div')`
  display: flex;
  flex-direction: column;
  padding: 5px 20px;
  background: ${(props) => props.theme.palette.background.default};
  height: 100%;
  justify-content: space-between;
`;

const StyledTitle = styled('div')`
  font-size: 1.5rem;
  margin-bottom: 10px;
`;

// set number value bigger in large screen
const StyledValue = styled('div')`
  font-size: 4rem;
  ${(props) => props.theme.breakpoints.up('xl')} {
    font-size: 5.5rem;
  }
`;

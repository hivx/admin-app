import { styled } from '@mui/material';
import { ReactNode } from 'react';

export const MobileDisplayTable = (props: { TableComponent: ReactNode }) => {
  return <StyledTable>{props.TableComponent}</StyledTable>;
};

/**
 * Style table mobile, when table not filter on footer
 */
const StyledTable = styled('div')`
  width: 100%;
  height: 100%;
  overflow: auto;
  & .table-footer {
    overflow: auto;
    grid-template-columns: 0.5fr auto;
  }
`;

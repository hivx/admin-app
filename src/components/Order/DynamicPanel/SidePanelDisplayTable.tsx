import { styled } from '@mui/material';
import { ReactNode } from 'react';

export const SidePanelDisplayTable = (props: { TableComponent: ReactNode }) => {
  return <StyledTable>{props.TableComponent}</StyledTable>;
};

const StyledTable = styled('div')`
  width: 100%;
  height: 100%;
  overflow: auto;
  & .table-container,
  & .table {
    background-color: ${(props) => props.theme.palette.background.default};
    border: 0;
  }
`;

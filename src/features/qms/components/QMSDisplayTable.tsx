import { lighten, styled } from '@mui/material';
import { ReactNode } from 'react';

export const QMSDisplayTable = (props: { TableComponent: ReactNode }) => {
  return <StyledTable>{props.TableComponent}</StyledTable>;
};

const StyledTable = styled('div')`
  width: 100%;
  height: 100%;
  overflow: auto;
  & .table-container,
  & .table {
    border-radius: 0;
    color: ${(props) =>
      props.theme.palette.getContrastText(props.theme.palette.primary.main)};
    background-color: ${(props) => props.theme.palette.primary.main};
    font-size: ${(props) => props.theme.typography.h5.fontSize};
    > thead {
      background-color: transparent;
    }
    > tbody {
      > tr {
        &:hover {
          background-color: ${(props) => lighten(props.theme.palette.primary.main, 0.6)};
        }
      }
    }
  }
`;

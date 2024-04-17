import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { SortDirection } from '@tanstack/react-table';
import { FC } from 'react';

export const SortArrow: FC<{ direction: SortDirection | false }> = (props) => {
  switch (props.direction) {
    case 'asc':
      return <ArrowUpwardIcon fontSize="small" />;
    case 'desc':
      return <ArrowDownwardIcon fontSize="small" />;
    default:
      return <></>;
  }
};

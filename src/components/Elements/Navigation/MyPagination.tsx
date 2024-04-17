import { Pagination, PaginationProps, styled } from '@mui/material';

type IMyPaginationProps = PaginationProps;

const StyledPagination = styled(Pagination)``;

export const MyPaginationDefaults: IMyPaginationProps = {
  variant: 'text',
  shape: 'rounded',
  size: 'small',
};

export const MyPagination = (props: IMyPaginationProps) => (
  <StyledPagination {...MyPaginationDefaults} {...props} />
);

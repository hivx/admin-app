import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { styled, SxProps, lighten, Stack, Typography } from '@mui/material';
import { FC, MouseEventHandler } from 'react';

import { ITablePaginationInfo } from '@/hooks';

import { MyButtonBase } from '../Elements/Buttons/MyButtonBase';

type MyTablePageChangerProps = {
  /**
   * Custom theme override
   */
  sx?: SxProps;
} & Partial<Pick<ITablePaginationInfo, 'pageCount' | 'onPageChange' | 'page'>>;

/**
 * Compact table pagination changer
 * For long pagination, use MyPagination component
 */
export const MyTablePageChanger: FC<MyTablePageChangerProps> = (props) => {
  const { sx, pageCount, onPageChange, page } = props;

  const onNextPageClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    onPageChange && onPageChange(e, (page ?? 0) + 1);
  };

  const onPreviousPageClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    onPageChange && onPageChange(e, (page ?? 0) - 1);
  };

  const nextButtonDisabled = page && page === pageCount ? true : false;
  const prevButtonDisabled = page && page === 1 ? true : false;

  return (
    <StyledTablePagination sx={sx}>
      <Stack direction="row" alignItems="center">
        <MyButtonBase onClick={onPreviousPageClick} disabled={prevButtonDisabled}>
          <ChevronLeftIcon color={prevButtonDisabled ? 'disabled' : 'action'} />
        </MyButtonBase>
        <StyledCurrentPage>
          <Typography variant="body2">{page}</Typography>
        </StyledCurrentPage>
        <MyButtonBase onClick={onNextPageClick} disabled={nextButtonDisabled}>
          <ChevronRightIcon color={nextButtonDisabled ? 'disabled' : 'action'} />
        </MyButtonBase>
      </Stack>
    </StyledTablePagination>
  );
};

/**
 * Styles
 */

export const StyledTablePagination = styled('div')`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: left;
  font-size: 12px;

  & > :not(:last-child) {
    margin-right: ${(props) => props.theme.spacing(1)};
  }
  .MuiPaginationItem-root {
    color: ${(props) => lighten(props.theme.palette.text.primary, 0.4)};
    &.Mui-selected {
      background-color: ${(props) =>
        props.theme.pacs?.customColors.tableHeaderBackground};
    }
  }
`;

export const StyledCurrentPage = styled('div')`
  display: flex;
  justify-content: center;
  background-color: ${(props) => props.theme.pacs?.customColors.tableRowHoverColor};
  color: ${(props) => props.theme.pacs?.customColors.textTableRowHoverColor};
  min-width: 24px; // 2 digits
  height: 100%;
`;

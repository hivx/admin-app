import { styled, lighten, Stack, Typography } from '@mui/material';
import { FC, ReactNode } from 'react';

import { ITablePaginationInfo, useTranslate } from '@/hooks';
import { filterTransientProps } from '@/utils/filterTransientProps';

import { MyTableOnRowPerPage } from './MyTableOnRowPerPage';
import { MyTablePageChanger } from './MyTablePageChanger';
import { MyTableRecordsCount } from './MyTableRecordsCount';

export type MyTablePaginationProps = {
  paginationProps: ITablePaginationInfo;
  renderPagination?: (paginationProps: ITablePaginationInfo) => ReactNode;
  showPageChanger: boolean;
  showPaginationInfo: boolean;
};

/**
 * Compact table pagination changer
 * For long pagination, use MyPagination component
 */
export const MyTablePagination: FC<MyTablePaginationProps> = (props) => {
  const { paginationProps, renderPagination, showPageChanger, showPaginationInfo } =
    props;

  const translate = useTranslate();

  return (
    <StyledTablePagination
      $showPaginationInfo={showPaginationInfo}
      spacing={0}
      direction="row"
    >
      {showPageChanger &&
        (renderPagination ? (
          renderPagination(paginationProps)
        ) : (
          <MyTablePageChanger
            pageCount={paginationProps.pageCount}
            onPageChange={paginationProps.onPageChange}
            page={paginationProps.page}
          />
        ))}
      {showPaginationInfo && (
        <StyledTablePaginationInfo>
          <MyTableRecordsCount start={paginationProps.start} end={paginationProps.end} />
          /
          <MyTableOnRowPerPage
            rowsPerPage={paginationProps.rowsPerPage}
            onRowsPerPageChange={paginationProps.onRowsPerPageChange}
            rowsPerPageOptions={paginationProps.rowsPerPageOptions}
          />
          <Typography variant="body2" pl={1}>
            {translate.messages.pagination.totalRecords({
              total: paginationProps.totalRecords,
            })}
          </Typography>
        </StyledTablePaginationInfo>
      )}
    </StyledTablePagination>
  );
};

/**
 * Styles
 */

export const StyledTablePagination = styled(Stack, filterTransientProps)<{
  $showPaginationInfo: boolean;
}>`
  // HACK TO MAKE THE PAGINATION ANCHOR IN THE CENTER OF THE TABLE
  // DO THIS TO AVOID THE COMPONENT SHIFTING LAYOUT WHEN CHANGING PAGE
  transform: ${(props) =>
    props.$showPaginationInfo ? 'translateX(25%)' : 'translateX(0%)'};
`;

const StyledTablePaginationInfo = styled('div')`
  /* width: fit-content; */
  display: flex;
  justify-content: end;
  align-items: center;
  color: ${(props) => lighten(props.theme.palette.text.primary, 0.4)};
`;

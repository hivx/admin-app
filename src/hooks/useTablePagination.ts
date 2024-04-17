import { ChangeEvent, useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { DEFAULT_PAGINATION } from '@/lib/dataHelper/apiHelper';
import { getCurrentTablePagination } from '@/stores/table/tableSelectors';
import { ITableID, setTablePage, setTablePerPage } from '@/stores/table/tableSlice';
import { IPaginationQuery } from '@/types';

import { useAppSelector } from '.';

export type ITablePaginationControls = {
  totalRecords?: number;
  pageSize?: number;
  /**
   * Pagination state from outside
   * if supplied, the component will return directly
   * the values from this state
   */
  rowsPerPageOptions?: number[];
};

export type ITablePaginationInfo = {
  pageCount: number;
  onPageChange: PageChangeHandler;
  rowsPerPageOptions: number[];
  onRowsPerPageChange: RowsPerPageChangeHandler;
  page: number;
  rowsPerPage: number;
  totalRecords: number;
  pageSize?: number;
  start: number;
  end: number;
};

type PageChangeHandler = (event: ChangeEvent<unknown>, page: number) => void;

type RowsPerPageChangeHandler = (value: number) => void;

const ROWS_PER_PAGE_OPTIONS = [10, 25, 50, 100];

const PAGINATION_STATE_DEFAULT: IPaginationQuery = {
  page: 1,
  perPage: DEFAULT_PAGINATION.perPage,
};

const DEFAULT_CONTROLS: ITablePaginationControls = {};

/**
 * store and handle pagination information
 */
export const useTablePagination = (
  tableId: ITableID,
  options: ITablePaginationControls = DEFAULT_CONTROLS,
): ITablePaginationInfo => {
  const { totalRecords, rowsPerPageOptions, pageSize } = options;
  const pagination = useAppSelector(getCurrentTablePagination(tableId));

  const dispatch = useDispatch();

  const rowsPerPage = pagination?.perPage || PAGINATION_STATE_DEFAULT.perPage;
  const page = pagination?.page || PAGINATION_STATE_DEFAULT.page;

  const pageCount = Math.ceil((totalRecords || 0) / rowsPerPage) || 1;

  const handlePageChange: PageChangeHandler = useCallback(
    (e, page) => {
      dispatch(setTablePage({ tableId, page }));
    },
    [dispatch, tableId],
  );

  const handleRowsPerPageChange: RowsPerPageChangeHandler = useCallback(
    (perPage) => {
      dispatch(setTablePerPage({ tableId, perPage }));
    },
    [dispatch, tableId],
  );

  const start = (page - 1) * rowsPerPage + 1;
  const end = start + ((pageSize || 0) - 1);

  return {
    pageCount,
    page,
    pageSize,
    rowsPerPage,
    onPageChange: handlePageChange,
    onRowsPerPageChange: handleRowsPerPageChange,
    rowsPerPageOptions: rowsPerPageOptions || ROWS_PER_PAGE_OPTIONS,
    totalRecords: totalRecords || 0,
    start,
    end,
  };
};

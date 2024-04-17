import { Column, SortDirection, SortingState } from '@tanstack/react-table';
import { useCallback, MouseEvent } from 'react';

import { useAppSelector, useAppDispatch } from '@/hooks';
import { getCurrentTableSort } from '@/stores/table/tableSelectors';
import { ITableID, setTableSort } from '@/stores/table/tableSlice';
import { ISortQuery } from '@/types';

export type ITableSortingControls = {
  currentSort: ISortQuery | undefined;
  setSort: (sort: ISortQuery) => void;
};

/**
 * Provide helper function to manage table sorting state
 */
export const useTableSortingState = <T>(tableId: ITableID) => {
  const dispatch = useAppDispatch();
  const currentSort = useAppSelector(getCurrentTableSort(tableId));
  const sortingState = convertStoreSortToTableSort(currentSort);
  // when user clicks toggle sort, update the query to match the new state
  const onColumnStateChanged = useCallback(
    (
      e: MouseEvent<HTMLTableHeaderCellElement>,
      column: Column<T>,
      nextState: SortDirection | false,
    ) => {
      // transform current sorting state
      const newSort = { ...currentSort };
      switch (nextState) {
        case 'asc':
          newSort[column.id] = nextState;
          break;
        case 'desc':
          newSort[column.id] = nextState;
          break;
        default:
          if (newSort && newSort[column.id]) delete newSort[column.id];
      }
      dispatch(setTableSort({ tableId, sort: newSort }));
    },
    [currentSort, dispatch, tableId],
  );

  return {
    sortingState,
    onColumnStateChanged,
    manualSorting: true,
    enableMultiSort: true,
  };
};

const convertStoreSortToTableSort = (storeSort?: ISortQuery): SortingState => {
  if (!storeSort) return [];
  return Object.entries(storeSort).map(([key, val]) => ({
    id: key,
    desc: val === 'desc',
  }));
};

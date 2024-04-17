import { RowModel, Table, TableOptions } from '@tanstack/react-table';
import { useEffect } from 'react';

import { useAppDispatch } from '@/hooks';
import { updateRowSelection } from '@/stores/table/tableSlice';

import { usePrevious } from './usePrevious';

export const useWatchTableRowsSelection = <T>(
  tableId: string,
  table: Table<T>,
  TanstackTableOptions: Omit<
    TableOptions<T>,
    'columns' | 'data' | 'getCoreRowModel'
  > = {},
) => {
  const dispatch = useAppDispatch();
  const selectedRowModel = table.getSelectedRowModel();
  const previousSelectedRowModel = usePrevious<RowModel<T>>(selectedRowModel);
  useEffect(() => {
    // update selected rows state in redux ONLY IF the selections
    // are different
    if (!isSelectedRowsEqual(selectedRowModel, previousSelectedRowModel)) {
      if (
        TanstackTableOptions.enableRowSelection !== false ||
        TanstackTableOptions.enableMultiRowSelection !== false
      ) {
        dispatch(
          updateRowSelection({
            tableId,
            selectedRows: selectedRowModel.rows.map((row) => row.original),
          }),
        );
      }
    }
  }, [
    TanstackTableOptions?.enableMultiRowSelection,
    TanstackTableOptions?.enableRowSelection,
    dispatch,
    previousSelectedRowModel,
    selectedRowModel,
    tableId,
  ]);
};

const isSelectedRowsEqual: <T>(
  current: RowModel<T>,
  previous: RowModel<T> | undefined,
) => boolean = (current, previous) => {
  if (!previous) return false;
  const currentRowIDs = current.rows.map((item) => item.id);
  const prevRowIDs = previous.rows.map((item) => item.id);
  // selected rows number is different
  if (currentRowIDs.length !== prevRowIDs.length) return false;
  // same selected rows, check if the selected rows is different from previous rows
  const a = currentRowIDs.sort().join();
  const b = prevRowIDs.sort().join();
  return a === b;
};

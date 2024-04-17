/* eslint-disable @typescript-eslint/no-explicit-any */
import { styled, SxProps } from '@mui/material';
import {
  CellContext,
  ColumnDef,
  ColumnHelper,
  createColumnHelper,
  getCoreRowModel,
  getSortedRowModel,
  HeaderContext,
  RowData,
  RowModel,
  RowSelectionState,
  Table,
  TableOptions,
  TableState,
  Updater,
  useReactTable,
} from '@tanstack/react-table';
import {
  MutableRefObject,
  ReactNode,
  useEffect,
  useMemo,
  useState,
  useCallback,
  RefObject,
} from 'react';
import { LocalizedString } from 'typesafe-i18n';

import { useTranslate } from '@/hooks';
import {
  ITablePaginationControls,
  ITablePaginationInfo,
  useTablePagination,
} from '@/hooks/useTablePagination';
import { useTableSortingState } from '@/hooks/useTableSortingState';
import { useWatchTableRowsSelection } from '@/hooks/useWatchTableRowsSelection';
import { ITableID } from '@/stores/table/tableSlice';
import { BaseEntity } from '@/types';

import { MyCheckbox } from '../Elements';
import { MyRadio } from '../Elements/Inputs/MyRadio';
import { StyledDivCenterChildren } from '../Layout/StyledDiv';

import { IMyDatagridProps, MyDatagrid } from './MyDatagrid';
import { MyTablePaginationWrapper } from './MyTablePaginationWrapper';
import { TableFooterComponent } from './TableFooterComponent';
import { TableShell } from './TableShell';

declare module '@tanstack/react-table' {
  interface TableMeta<TData extends RowData> {
    updateData: (rowIndex: number, columnId: string, value: unknown) => void;
  }
}

type TableRecordField<T> = {
  /**
   * Table field name, must be a property of table record
   *
   * Example: order: { id: 123, orderDate: '1234' } --> name = 'orderDate'
   */
  name: keyof T;
  headerLabel: string | LocalizedString;
  renderHeader?: (headerLabel: string | LocalizedString) => ReactNode;
  renderCell?: (cellContext: CellContext<T, any>) => ReactNode;
  renderFooter?: (headerContext: HeaderContext<T, any>) => ReactNode;
  columnDefOptions?: Omit<ColumnDef<T>, 'header' | 'footer' | 'cell'>;
  // sort?: { initialDirection?: SortDirection };
  enableSort?: boolean;
};

type TableArbitraryField<T> = {
  /**
   * Escape hatch by providing the entire accessor/display/group function from columnHelper
   *
   * Use this when we need to access deeply nested data from a record
   */
  getColumnDef: (columnHelper: ColumnHelper<T>) => ColumnDef<T>;
};

const DEFAULT_TABLE_ID = 'noname-table';

export type TableRefType = {
  tableContainerRef: RefObject<HTMLDivElement> | React.ForwardedRef<HTMLDivElement>;
};

export type ITableField<T> =
  | ({
      type: 'record';
    } & TableRecordField<T>)
  | ({
      type: 'custom';
    } & TableArbitraryField<T>);

export type IWithTableId = {
  /**
   * Table ID, used for storage of redux table state
   */
  tableId: ITableID;
};

type MyTableProps<T> = {
  /**
   * Table ID, used for storage of redux table state
   */
  tableId?: ITableID;
  /**
   * table object ref
   */
  tableRef?: MutableRefObject<Table<T> | undefined>;
  /**
   * Table Element Ref
   */
  tableContainerRef?: TableRefType['tableContainerRef'];
  /**
   * Array of data that will be displayed
   *
   * Example: table displaying items of type IOrderDTO --> data: IOrderDTO[]
   */
  data?: T[];
  /**
   * Choose which field to display and its content
   */
  tableColumnsDescription: Array<ITableField<T>>;
  /**
   * Should display pagination controls
   * @default true
   */
  showPagination?: boolean;
  /**
   * Control pagination information
   * @default true
   */
  showPaginationInfo?: boolean;
  /**
   * External controls for pagination handling
   */
  paginationControls?: ITablePaginationControls;
  manualPagination?: boolean;
  /**
   * If enabled, the table will automatically select the first row
   */
  initialFirstRowSelected?: boolean;
  /**
   * Externally control table selection state
   */
  selectedIDs?: BaseEntity['id'][];
  /**
   * Render custom pagination component with provided pagination props
   */
  renderPagination?: (paginationProps: ITablePaginationInfo) => ReactNode;
  /**
   * Render action buttons
   */
  renderActionButtons?: (table: Table<T>) => ReactNode;

  /**
   * Handle change events
   */
  handleRowSelectionChange?: (selectedRowsModel: RowModel<T>) => void;

  MyDataGridProps?: Omit<IMyDatagridProps<T>, 'table'>;

  TanstackTableOptions?: Omit<TableOptions<T>, 'columns' | 'data' | 'getCoreRowModel'>;

  /**
   * Custom Fitler component (search text box)
   */
  FilterComponent?: ReactNode;

  manualSorting?: boolean;
  /**
   * Style override
   */
  sx?: SxProps;
  /**
   * Hidden footer for table without footer/pagination
   */
  hiddenFooter?: boolean;
  /**
   * Control show/hide radiobutton in a row
   */
  showRadioButton?: boolean;
};

/**
 * Component to pre-render empty data
 */
export const MyTable = <T,>(props: MyTableProps<T>) => {
  const { data, initialFirstRowSelected } = props;
  /**
   * HOTFIX: Close filter form when execute searching
   * Case: If doesn't exist 'initialFirstRowSelected' will not close filter form **
   * If "initialFirstRowSelected" exist still close filter form --- NEED TO FIX THIS CASE
   */
  if ((data && data.length) || !initialFirstRowSelected)
    return <MyTableInner {...props} />;
  // set random key so that react replace this empty table with the table with data later
  else return <MyTableInner {...props} data={[]} key={'emptytable'} />;
};

/**
 * Build table based on input data and table field configuration
 *
 * We select the fields that will be displayed by supplying an array of fields
 * defined by the type ITableField
 */
export const MyTableInner = <T,>(props: MyTableProps<T>) => {
  const {
    tableId = DEFAULT_TABLE_ID,
    tableRef,
    tableContainerRef,
    data = [],
    tableColumnsDescription,
    MyDataGridProps,
    TanstackTableOptions,
    FilterComponent,
    paginationControls,
    renderPagination,
    renderActionButtons,
    initialFirstRowSelected = false,
    selectedIDs,
    showPagination = true,
    showPaginationInfo = true,
    manualPagination = true,
    manualSorting = true,
    showRadioButton = false,
    sx,
    hiddenFooter,
  } = props;
  const translate = useTranslate();
  const columnHelper = useMemo(() => createColumnHelper<T>(), []);

  /**
   * Must use type any here because generic tanstack table columns is expected to be ColumnDef<T, any>[]
   */
  const columns = useMemo<ColumnDef<T>[]>(() => {
    const columns: ColumnDef<T>[] = [];
    let rowSelectionColumn: ColumnDef<T>;
    // check if we should add selection column to the table
    if (TanstackTableOptions?.enableMultiRowSelection !== false) {
      rowSelectionColumn = {
        id: 'select',
        header: ({ table }) => (
          <StyledCheckboxContainer>
            <MyCheckbox
              {...{
                checked: table.getIsAllRowsSelected(),
                indeterminate: table.getIsSomeRowsSelected(),
                onChange: table.getToggleAllRowsSelectedHandler(),
              }}
              compact
            />
          </StyledCheckboxContainer>
        ),
        cell: ({ row }) => (
          <StyledCheckboxContainer>
            <MyCheckbox
              {...{
                checked: row.getIsSelected(),
                indeterminate: row.getIsSomeSelected(),
                onChange: row.getToggleSelectedHandler(),
              }}
              compact
            />
          </StyledCheckboxContainer>
        ),
        size: 35,
        enableResizing: false,
      };
      columns.push(rowSelectionColumn);
    } else {
      /**
       * Check condition to  add column radio button to the table
       */
      if (showRadioButton && TanstackTableOptions?.enableRowSelection !== false) {
        rowSelectionColumn = {
          id: 'select',
          header: () => <StyledCheckboxContainer>Chọn</StyledCheckboxContainer>,
          cell: ({ row }) => (
            <StyledCheckboxContainer>
              <MyRadio
                name="radio-buttons"
                {...{
                  checked: row.getIsSelected(),
                  onChange: row.getToggleSelectedHandler(),
                }}
                compact
              />
            </StyledCheckboxContainer>
          ),
          size: 35,
          enableResizing: false,
        };
        columns.push(rowSelectionColumn);
      }
    }

    tableColumnsDescription.forEach((item) => {
      const { type } = item;
      switch (type) {
        case 'custom':
          return columns.push({
            ...item.getColumnDef(columnHelper),
          });
        case 'record':
          return columns.push({
            ...(columnHelper.accessor((row: T) => row[item.name], {
              id: item.name as string,
              // Prepare header content
              header: () =>
                item.renderHeader
                  ? item.renderHeader(item.headerLabel)
                  : item.headerLabel,
              // Prepare cell content
              cell: (props) =>
                item.renderCell ? item.renderCell(props) : props.getValue(),
              // Prepare footer content (if any)
              footer: item.renderFooter
                ? (props) => item.renderFooter && item.renderFooter(props)
                : undefined,
              enableSorting: item.enableSort ?? false,
            }) as ColumnDef<T>),
            ...item.columnDefOptions,
          });
      }
    });
    // .filter((item) => item !== undefined) as ColumnDef<T>[];
    return columns;
  }, [
    TanstackTableOptions?.enableMultiRowSelection,
    TanstackTableOptions?.enableRowSelection,
    columnHelper,
    showRadioButton,
    tableColumnsDescription,
  ]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    initialState: {
      rowSelection: getInitialRowSelectedState({
        data,
        initialFirstRowSelected,
        selectedIDs,
      }),
    },
    manualPagination,
    manualSorting,
    getRowId: getRowId,
    columnResizeMode: 'onChange',
    ...TanstackTableOptions,
  });

  const { paginationProps, onColumnStateChanged } = useTableState({
    tableId,
    table,
    manualPagination,
    paginationControls,
    selectedIDs,
  });

  useWatchTableRowsSelection<T>(tableId, table, TanstackTableOptions);

  useEffect(() => {
    if (tableRef) {
      tableRef.current = table;
    }
  }, [table, tableRef]);

  return (
    <TableShell
      sx={sx}
      hiddenFooter={hiddenFooter}
      FooterComponent={
        <TableFooterComponent
          tableContainerRef={tableContainerRef}
          FooterCenterComponent={
            <MyTablePaginationWrapper
              tableContainerRef={tableContainerRef}
              paginationProps={paginationProps}
              showPageChanger={showPagination}
              showPaginationInfo={showPaginationInfo}
              renderPagination={renderPagination}
            />
          }
          FooterLeftComponent={renderActionButtons && renderActionButtons(table)}
          FooterRightComponent={FilterComponent}
        />
      }
      DatagridComponent={
        <MyDatagrid
          tableID={tableId}
          tableContainerRef={tableContainerRef}
          table={table}
          onColumnSortChanged={onColumnStateChanged}
          columnSortTooltip={translate.tooltip.table.sort()}
          {...MyDataGridProps}
        ></MyDatagrid>
      }
    />
  );
};

/**
 * Build unique row IDs for comparison purpose
 * By default, Tanstack table assign row ID with Row Index
 * For table with records from server, we attach the record's id to
 * the row index to better differentiate between rows
 */
export const getRowId = <T,>(original: T, index: number) => {
  const org = original as Record<string, unknown>;
  if (org && org.id) return `${org.id}`;
  return `${index}`;
};

const StyledCheckboxContainer = styled(StyledDivCenterChildren)`
  /* width: fit-content; */
  /* padding: 0; */
`;

/**
 * Manually control table state, all table state logic goes here
 */
const useTableState = <T,>(props: {
  tableId: MyTableProps<T>['tableId'];
  table: Table<T>;
  paginationControls: MyTableProps<T>['paginationControls'];
  manualPagination: MyTableProps<T>['manualPagination'];
  selectedIDs: MyTableProps<T>['selectedIDs'];
}) => {
  const {
    table,
    paginationControls,
    tableId = DEFAULT_TABLE_ID,
    manualPagination,
    selectedIDs,
  } = props;
  const [state, setState] = useState<TableState>(table.initialState);
  const { sortingState, onColumnStateChanged, enableMultiSort } =
    useTableSortingState<T>(tableId);
  const paginationProps = useTablePagination(tableId, paginationControls);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({
    ...table.initialState.rowSelection,
  });

  // Example for handle internal row selection change
  // Reference: https://www.material-react-table.com/docs/guides/table-state-management#add-side-effects-in-set-state-callbacks
  const onRowSelectionChange = useCallback(
    (updater: Updater<RowSelectionState>) => {
      setRowSelection((prevRowState) => {
        let newRowState: RowSelectionState;

        // override row selection with external selectedIDs
        if (selectedIDs) {
          return selectRows(selectedIDs);
        }
        // Update new Row State
        if (updater instanceof Function) {
          newRowState = updater(prevRowState);
        } else {
          newRowState = updater;
        }
        return newRowState;
      });
    },
    [selectedIDs],
  );

  // Override the state managers for the table instance to your own
  table.setOptions((prev) => ({
    ...prev,
    state: {
      ...state,
      pagination: manualPagination
        ? {
            pageIndex: paginationProps.page,
            pageSize: paginationControls?.pageSize || 0,
          }
        : undefined,
      sorting: sortingState,
      // override rowSelection state if selectedIDs is supplied
      rowSelection,
    },
    pageCount: paginationProps.pageCount,
    onStateChange: setState,
    onColumnStateChanged,
    onRowSelectionChange: onRowSelectionChange,
    enableMultiSort,
  }));

  return { onColumnStateChanged, paginationProps };
};

/**
 * Select first row from input data
 */
const selectFirstRow = <T,>(data: MyTableProps<T>['data']): RowSelectionState => {
  if (data && data.length) {
    return {
      [getRowId(data[0], 0)]: true,
    };
  }
  return {};
};

const getInitialRowSelectedState = <T,>(options: {
  data: MyTableProps<T>['data'];
  initialFirstRowSelected: MyTableProps<T>['initialFirstRowSelected'];
  selectedIDs: MyTableProps<T>['selectedIDs'];
}): RowSelectionState => {
  const { data, initialFirstRowSelected, selectedIDs } = options;
  if (data && data.length) {
    if (initialFirstRowSelected) {
      return selectFirstRow(data);
    }

    if (selectedIDs && selectedIDs.length) {
      return selectRows(selectedIDs);
    }
  }
  return {};
};

/**
 * Select rows using supplied IDs
 * Use this in case we already know the initial IDs to be selected
 */
const selectRows = (ids: BaseEntity['id'][]): RowSelectionState => {
  if (ids && ids.length) {
    const selectionState: RowSelectionState = {};
    ids.forEach((id) => {
      selectionState[id] = true;
    });
    return selectionState;
  }
  return {};
};

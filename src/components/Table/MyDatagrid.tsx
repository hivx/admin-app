import { Box, LinearProgress } from '@mui/material';
import { Column, flexRender, Row, SortDirection, Table } from '@tanstack/react-table';
import { MouseEvent, useCallback } from 'react';
import { LocalizedString } from 'typesafe-i18n';

import { MyTooltip } from '../Elements/Tooltip/MyTooltip';
import { StyledDivCenterChildren } from '../Layout/StyledDiv';

import Datagrid from './MyDatagrid.styles';
import { TableRefType } from './MyTable';
import { SortArrow } from './SortArrow';

export type IMyDatagridProps<T> = {
  /**
   * Table ID if exists
   */
  tableID?: string;
  /**
   * Output of useReactTable
   */
  table: Table<T>;
  /**
   * Table Element Ref
   */
  tableContainerRef?: TableRefType['tableContainerRef'];
  /**
   * Should render footer
   * @default undefined
   */
  displayFooter?: boolean;
  /**
   * If true, render a skeleton table to indicate loading state
   */
  isLoading?: boolean;
  /**
   * If true, mouse cursor will be pointer property
   * @default false
   */
  hasRowClick?: boolean;
  /**
   * Column sort tooltip
   */
  columnSortTooltip?: string | LocalizedString;
  /**
   * Determine whether to Select row on Right click
   * @default true
   */
  selectRowOnRightClick?: boolean;
  /**
   * Row actions
   */
  onRowClick?: (e: MouseEvent<HTMLTableRowElement>, row: Row<T>, table: Table<T>) => void;
  onRowDoubleClick?: (
    e: MouseEvent<HTMLTableRowElement>,
    row: Row<T>,
    table: Table<T>,
  ) => void;
  onRowRightClick?: (
    e: MouseEvent<HTMLTableRowElement>,
    row: Row<T>,
    table: Table<T>,
  ) => void;
  /**
   * Handle sort column direction change
   */
  onColumnSortChanged?: (
    e: MouseEvent<HTMLTableHeaderCellElement>,
    column: Column<T>,
    nextSortDirection: SortDirection | false,
  ) => void;
};

/**
 * The basic building block of a table
 *
 * This component takes care of styling and layout for a table
 */
export const MyDatagrid = <T,>(props: IMyDatagridProps<T>) => {
  const {
    tableID,
    table,
    tableContainerRef,
    displayFooter,
    isLoading,
    hasRowClick = false,
    selectRowOnRightClick = true,
    columnSortTooltip,
    onRowClick,
    onRowDoubleClick,
    onRowRightClick,
    onColumnSortChanged,
  } = props;

  /**
   * TODO: Mutiple selected row with shift+click, ctrl + click
   */
  // const getRowRange = (
  //   rows: Row<T>[],
  //   currentIndex: number,
  //   selectedIndex: number,
  // ): Row<T>[] => {
  //   const rangeStart = selectedIndex > currentIndex ? currentIndex : selectedIndex;
  //   const rangeEnd = rangeStart === currentIndex ? selectedIndex : currentIndex;
  //   return rows.slice(rangeStart, rangeEnd + 1);
  // };
  // let lastSelectedId: number;
  const rowLeftClickHandler = useCallback(
    (e: MouseEvent<HTMLTableRowElement>, row: Row<T>) => {
      // onRowClick && onRowClick(e, row);
      switch (e.detail) {
        case 1: {
          // single click
          // select the row only if it's not selected
          if (!row.getIsSelected() && !e.shiftKey) row.toggleSelected();
          onRowClick && onRowClick(e, row, table);
          /**
           * TODO: Mutiple selected row with shift+click, ctrl + click
           */
          // if (e.shiftKey) {
          //   const { rows } = table.getRowModel();
          //   const rowsToToggle = getRowRange(rows, row.index, lastSelectedId);
          //   const isLastSelected = rowsToToggle[lastSelectedId].getIsSelected();
          //   rowsToToggle.forEach((row) => row.toggleSelected(!isLastSelected));
          // }
          // lastSelectedId = row.index;
          break;
        }
        case 2: {
          // double click
          onRowDoubleClick && onRowDoubleClick(e, row, table);
          break;
        }
      }
    },
    [onRowClick, onRowDoubleClick, table],
  );

  const rowRightClickHandler = useCallback(
    (e: MouseEvent<HTMLTableRowElement>, row: Row<T>) => {
      e.preventDefault(); // prevent browser context menu showing up
      e.stopPropagation();
      if (onRowRightClick) {
        if (!row.getIsSelected() && selectRowOnRightClick) row.toggleSelected();
        onRowRightClick(e, row, table);
      }
    },
    [onRowRightClick, selectRowOnRightClick, table],
  );

  const sortChangeHandler = useCallback(
    (e: MouseEvent<HTMLTableHeaderCellElement>, column: Column<T>) => {
      if (column.getCanSort()) {
        const currentSortDirection = column.getIsSorted();
        const toggle = column.getToggleSortingHandler();
        toggle && toggle(e);
        // console.log('column', column);
        // run onColumSortChanged effect
        // Tanstack table toggle function order: desc --> asc --> false --> desc ...
        switch (currentSortDirection) {
          case 'asc':
            // current state asc, next state is false
            onColumnSortChanged && onColumnSortChanged(e, column, false);
            break;
          case 'desc':
            // current state desc, next state is asc
            onColumnSortChanged && onColumnSortChanged(e, column, 'asc');
            break;
          default:
            // current state false, next state is desc
            onColumnSortChanged && onColumnSortChanged(e, column, 'desc');
        }
      }
    },
    [onColumnSortChanged],
  );

  return (
    <Datagrid.StyledDatagridContainer
      className="table-container"
      ref={tableContainerRef}
      id={tableID}
    >
      <table
        {...{
          style: {
            width: table.getCenterTotalSize(),
          },
        }}
        className="table"
      >
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                const canSort = header.column.getCanSort();
                const THeadContent = (
                  <StyledDivCenterChildren>
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.header, header.getContext())}
                    <SortArrow direction={header.column.getIsSorted()} />
                  </StyledDivCenterChildren>
                );
                return (
                  <th
                    key={header.id}
                    className={canSort ? 'sortable' : ''}
                    {...{
                      colSpan: header.colSpan,
                      style: {
                        width: header.getSize(),
                      },
                      onClick: (e) => sortChangeHandler(e, header.column),
                    }}
                  >
                    {canSort ? (
                      <MyTooltip title={columnSortTooltip || ''}>
                        {THeadContent}
                      </MyTooltip>
                    ) : (
                      THeadContent
                    )}

                    <div
                      className="resizer"
                      {...{
                        onMouseDown: header.getResizeHandler(),
                        onTouchStart: header.getResizeHandler(),
                      }}
                    >
                      <div></div>
                    </div>
                  </th>
                );
              })}
            </tr>
          ))}
          {isLoading && (
            <tr>
              <td style={{ padding: 0 }}>
                <Box sx={{ width: '100%', position: 'absolute' }}>
                  <LinearProgress />
                </Box>
              </td>
            </tr>
          )}
        </thead>
        <Datagrid.StyledTBody $hasRowClick={hasRowClick}>
          {table.getRowModel().rows.map((row) => (
            <tr
              key={row.id}
              onClick={(e) => rowLeftClickHandler(e, row)}
              onContextMenu={(e) => rowRightClickHandler(e, row)}
              className={row.getIsSelected() ? 'selected' : ''}
            >
              {row.getVisibleCells().map((cell) => {
                const context = cell.getContext();
                return (
                  <td
                    key={cell.id}
                    {...{
                      style: {
                        width: cell.column.getSize(),
                        maxWidth: cell.column.getSize(),
                      },
                    }}
                    // automatically display browser tooltip for 'record' column type
                    /**
                     * COMMENT 20/06/2023 - HOANG
                     * Hiện tại 1 số cột có icon khi hover vào cần hiện tool tip và có thể sắp xếp nhưng hiện tại cột có kiểu custom đang không thể sắp xếp được -> đang dùng cột có kiểu record để sắp xếp, vấn đề của cột có kiểu record là sẽ hiển thị tooltip mặc định theo giá trị của cột như vậy khi chúng ta hover vào icon có tooltip trong cột có kiểu record sẽ sinh ra 2 tooltip (1 của icon và 1 của giá trị cột)
                     * Hiện tại chưa có phương án tối ưu nhất để xử lý -> xử lý tạm thời bằng cách ẩn tootip mặc định giá trị cột record và hiện tooltip thủ công cho giá trị từng cột
                     * Sẽ cập nhật tiếp ở các bản sau
                     */

                    // title={typeof cellValue === 'string' ? cellValue : ''}
                  >
                    {flexRender(cell.column.columnDef.cell, context)}
                  </td>
                );
              })}
            </tr>
          ))}
        </Datagrid.StyledTBody>
        {displayFooter && (
          <tfoot>
            {table.getFooterGroups().map((footerGroup) => (
              <tr key={footerGroup.id}>
                {footerGroup.headers.map((header) => (
                  <th key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(header.column.columnDef.footer, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </tfoot>
        )}
      </table>
    </Datagrid.StyledDatagridContainer>
  );
};

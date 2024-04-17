/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, Reducer } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { cloneDeep, isEqual } from 'lodash';
import { LiteralUnion } from 'type-fest';

import { DEFAULT_PAGINATION, DEFAULT_QUERY } from '@/lib/dataHelper/apiHelper';
import { IGetManyResourcesQuery } from '@/types';
import { RESOURCES } from '@/types/resources';
import { getCurrentDate } from '@/utils/dateUtils';
import { cleanObject } from '@/utils/format';

import { initialState } from './tableInitialState';

export type ITableID = LiteralUnion<`${RESOURCES}`, string>;
export type IReduxTableState = {
  /**
   * Table filter
   */
  query: IGetManyResourcesQuery;
  /**
   * Table selection
   */
  selection: {
    selectedRow: Record<string, unknown> | null;
    selectedRows: Record<string, unknown>[];
  };
  /**
   * Table default search field
   */
  defaultFilterField: string | null;
};

type CommonPayload = {
  tableId: ITableID;
};

type SetTableFilterAction = PayloadAction<
  CommonPayload & {
    /**
     * Filter object
     */
    filter: IGetManyResourcesQuery['filter'];
    /**
     * If merge is true, merge filter object with
     * stored filter instead of setting filter
     * @default false
     */
    merge?: boolean;
  }
>;

export const TABLE_REDUCER = 'table';

const defaultTableState: IReduxTableState = {
  query: DEFAULT_QUERY,
  selection: {
    selectedRow: null,
    selectedRows: [],
  },
  defaultFilterField: null,
};
/**
 * initialize table state
 */
const initializeTableState = (
  tableState?: Partial<IReduxTableState>,
): IReduxTableState => ({
  // fix error cannot assign to read only property for constant when set default state[tableId]
  ...cloneDeep(defaultTableState),
  ...tableState,
});

export const tableSlice = createSlice({
  name: TABLE_REDUCER,
  initialState,
  reducers: {
    setSelectedRow: (
      state,
      { payload }: PayloadAction<CommonPayload & { selectedRow: any }>,
    ) => {
      const { tableId, selectedRow } = payload;
      if (!state.data[tableId]) state.data[tableId] = initializeTableState();
      state.data[tableId].selection.selectedRow = selectedRow;
    },
    updateRowSelection: (
      state,
      { payload }: PayloadAction<CommonPayload & { selectedRows: any[] }>,
    ) => {
      const { selectedRows, tableId } = payload;
      if (!state.data[tableId]) state.data[tableId] = initializeTableState();
      state.data[tableId].selection.selectedRow = selectedRows[0];
      state.data[tableId].selection.selectedRows = selectedRows;
    },
    setTableQuery: (
      state,
      { payload }: PayloadAction<CommonPayload & { query: IGetManyResourcesQuery }>,
    ) => {
      const { tableId, query } = payload;
      if (!state.data[tableId]) state.data[tableId] = initializeTableState();
      state.data[tableId].query = query;
    },
    setTableFilter: (state, { payload }: SetTableFilterAction) => {
      const { tableId, filter, merge } = payload;
      const tableState = state.data[tableId];
      if (!tableState) state.data[tableId] = initializeTableState();
      const cleanedFilter = cleanObject(filter);
      if (!isEqual(cleanedFilter, tableState.query.filter)) {
        // filter changed, update state
        if (merge) {
          tableState.query.filter = { ...tableState.query.filter, ...filter };
        } else tableState.query.filter = filter;
        // set page to 1 after filter change
        if (tableState.query.pagination) tableState.query.pagination.page = 1;
      }
    },
    setTablePagination: (
      state,
      {
        payload,
      }: PayloadAction<
        CommonPayload & { pagination: IGetManyResourcesQuery['pagination'] }
      >,
    ) => {
      const { tableId, pagination } = payload;
      if (!state.data[tableId]) state.data[tableId] = initializeTableState();
      state.data[tableId].query.pagination = pagination;
    },
    setTablePage: (
      state,
      { payload }: PayloadAction<CommonPayload & { page: number }>,
    ) => {
      const { tableId, page } = payload;
      if (!state.data[tableId]) state.data[tableId] = initializeTableState();
      state.data[tableId].query.pagination = {
        page,
        perPage:
          state.data[tableId].query.pagination?.perPage || DEFAULT_PAGINATION.perPage,
      };
    },
    setTablePerPage: (
      state,
      { payload }: PayloadAction<CommonPayload & { perPage: number }>,
    ) => {
      const { tableId, perPage } = payload;
      if (!state.data[tableId]) {
        state.data[tableId] = initializeTableState({
          query: {
            ...defaultTableState.query,
            pagination: {
              page: 1,
              perPage,
            },
          },
        });
      } else {
        state.data[tableId].query.pagination = {
          page: 1,
          perPage,
        };
      }
    },
    setTableSort: (
      state,
      {
        payload,
      }: PayloadAction<CommonPayload & { sort: IGetManyResourcesQuery['sort'] }>,
    ) => {
      const { tableId, sort } = payload;
      if (!state.data[tableId]) state.data[tableId] = initializeTableState();
      state.data[tableId].query.sort = sort;
    },
    setTableDefaultFilterField: (
      state,
      { payload }: PayloadAction<CommonPayload & { fieldName: string }>,
    ) => {
      const { tableId, fieldName } = payload;
      if (!state.data[tableId]) state.data[tableId] = initializeTableState();
      state.data[tableId].defaultFilterField = fieldName;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setSelectedRow,
  updateRowSelection,
  setTableQuery,
  setTableFilter,
  setTablePagination,
  setTablePage,
  setTablePerPage,
  setTableSort,
  setTableDefaultFilterField,
} = tableSlice.actions;

export const tableReducer: Reducer<typeof initialState> = (state, action) => {
  const expiredTime = state?.expiredTime;

  // clear table query when it is expired
  if (getCurrentDate().unix() >= (expiredTime || 0)) {
    return tableSlice.reducer(undefined, action);
  }
  return tableSlice.reducer(state, action);
};

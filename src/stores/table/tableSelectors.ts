import { RootState } from '@/stores/redux';
import { IGenericFilter, IGetManyResourcesQuery, IPaginationQuery } from '@/types';

export const getCurrentSelectedRow =
  <T>(tableId: string) =>
  (state: RootState) =>
    state.table.data[tableId]?.selection.selectedRow as T | undefined;

export const selectCurrentSelectedRows =
  <T>(tableId: string) =>
  (state: RootState) =>
    state.table.data[tableId]?.selection.selectedRows as T | undefined;

export const getCurrentTableQuery =
  <T extends IGenericFilter>(tableId: string) =>
  (state: RootState) =>
    state.table.data[tableId]?.query as IGetManyResourcesQuery<T> | undefined;

export const selectCurrentTableFilter =
  <T extends IGenericFilter>(tableId: string) =>
  (state: RootState) =>
    state.table.data[tableId]?.query?.filter as
      | IGetManyResourcesQuery<T>['filter']
      | undefined;

export const getCurrentTablePagination = (tableId: string) => (state: RootState) =>
  state.table.data[tableId]?.query?.pagination as IPaginationQuery | undefined;

export const getCurrentTablePage = (tableId: string) => (state: RootState) =>
  state.table.data[tableId]?.query?.pagination?.page;

export const getCurrentTablePerPage = (tableId: string) => (state: RootState) =>
  state.table.data[tableId]?.query?.pagination?.perPage;

export const getCurrentTableSort = (tableId: string) => (state: RootState) =>
  state.table.data[tableId]?.query?.sort;

export const getCurrentTableDefaultFieldName = (tableId: string) => (state: RootState) =>
  state.table.data[tableId]?.defaultFilterField;

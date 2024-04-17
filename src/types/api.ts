import { SortDirection } from '@tanstack/react-table';

import { BaseEntity, Purgeable } from '.';
export type IGenericFilter = Record<string, unknown>;

/**
 * Human-readable object that will be converted to IPaginationParams to send
 */
export type IPaginationQuery = {
  page: number;
  perPage: number;
};

/**
 * HTTP Params that will be sent to the server
 * Computed from IPaginationQuery
 */
export type IPaginationParams = {
  limit: string;
  offset: string;
};

/**
 * Human-readable sort information
 * Object structure: [fieldName]: 'asc' | 'desc' (ascending or descending)
 * @example
 * // Sort by fields: id - ascending
 * const sort: ISortQuery = { id: 'asc' }
 */
export type ISortQuery = Record<string, SortDirection>;

/**
 * Query object for a single resource by ID
 */
export type IGetOneResourceQuery = {
  id: BaseEntity['id'];
};

/**
 * Query object for a single resource by list ID
 */
export type IGetResourceQueryByListIds = {
  ids: BaseEntity['id'][];
};

/**
 * React-admin-like query object for a resource
 */
export type IGetManyResourcesQuery<T extends IGenericFilter = IGenericFilter> = {
  filter: T;
  pagination?: IPaginationQuery;
  sort?: ISortQuery;
};

export type IGetManyResourceQueryResult<T> = {
  list: T[];
  meta: {
    totalRecords: number;
  };
};

export type IGenericResponse<T> = {
  body: T;
  header: IResponseHeader;
};
/**
 * Header response from server
 */
export type IResponseHeader = {
  code: number;
  datetime: string;
  limit: number;
  message: string;
  offset: number;
  totalRecords: number;
};
/**
 * Object parameter for delete a admin resource
 */
export type IDeleteResource = BaseEntity & Partial<Purgeable>;

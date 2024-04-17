import { IGetManyResourcesQuery, IPaginationParams, IPaginationQuery } from '@/types';
import {
  IGenericFilter,
  IGenericResponse,
  IGetManyResourceQueryResult,
  IGetOneResourceQuery,
  IResponseHeader,
  ISortQuery,
} from '@/types/api';
import {
  KIOSK_RESOURCES,
  KQXN_RESOURCES,
  QMS_RESOURCES,
  RESOURCES,
} from '@/types/resources';

import { ItechBaseRequest } from '../iTechBaseQuery';

export const DEFAULT_PAGINATION: IPaginationQuery = {
  page: 1,
  perPage: 50,
};

export const DEFAULT_SORT: ISortQuery = {
  id: 'asc',
};

export const DEFAULT_QUERY: IGetManyResourcesQuery<IGenericFilter> = {
  filter: {},
  pagination: DEFAULT_PAGINATION,
  sort: DEFAULT_SORT,
};

/**
 * Converts human-readable Pagination object to actual HTTP pagination Params
 */
export const createPaginationParams: (
  pagination?: IPaginationQuery,
) => IPaginationParams = (pagination = { page: 1, perPage: 0 }) => ({
  offset: `${(pagination.page - 1) * pagination.perPage}`,
  limit: `${pagination.perPage}`,
});

/**
 * Converts human-readable Sort object to actual HTTP orderBy string
 * @example
 * const sort = { id: 'asc', name: 'desc' };
 * console.log(createSortParams(sort)); // '+id,-name'
 */
export const createSortParams: (sort?: ISortQuery) => string | undefined = (sort) => {
  if (!sort) return undefined;
  const params = Object.entries(sort).map(([key, value]) => {
    switch (value) {
      case 'asc':
        return `+${key}`;
      case 'desc':
        return `-${key}`;
    }
  });
  const orderByStr = params.join(',');
  return orderByStr ? orderByStr : undefined;
};

type GetManyResourceRequestParams = <T extends IGenericFilter>(
  /**
   * React-admin query object containing filter, sort, pagination
   */
  q: IGetManyResourcesQuery<T>,
  /**
   * Main resource identifier, usually maps to a DTO on Back-end
   */
  resource:
    | `${RESOURCES}`
    | `${QMS_RESOURCES}`
    | `${KIOSK_RESOURCES}`
    | `${KQXN_RESOURCES}`,
  /**
   * Extra options
   */
  options?: {
    /**
     * Use API GET instead of POST if provided filter is empty
     * Only works if API has GET all items endpoint
     * @default true
     */
    useGetAllWhenFilterIsEmpty?: boolean;
  },
) => ItechBaseRequest;

/**
 * Helper function to return an ItechBaseRequest
 * Use to handle querying a LIST of any resource
 * Similar to DataProvider.getList
 */
export const getManyResourcesRequestParams: GetManyResourceRequestParams = (
  query,
  resource,
  options = {},
) => {
  // const baseUrl = `${apiUrl}/${prefix ? `${prefix}/` : ''}${alter || pathResource}${postfix ? `/${postfix}` : ''}`;
  const { pagination, filter, sort } = query;

  const { useGetAllWhenFilterIsEmpty = true } = options;

  const orderBy = createSortParams(sort);

  const params = {
    ...createPaginationParams(pagination),
    orderBy,
  };

  if (Object.keys(filter).length === 0 && useGetAllWhenFilterIsEmpty) {
    // empty filter, use GET ALL if API is available
    return {
      url: resource,
      method: 'GET',
      params,
      useAsync: true,
      useHospitalID: true,
    };
  }
  return {
    url: `search/${resource}`,
    method: 'POST',
    params,
    data: filter,
    useAsync: true,
    useHospitalID: true,
  };
};

export type IGetOneResourceRequestParams = (
  query: IGetOneResourceQuery,
  resource: `${RESOURCES}`,
) => ItechBaseRequest;

/**
 * Helper function to return an ItechBaseRequest
 * Use to handle querying ONE instance of any resource
 * Similar to DataProvider.getOne
 */
export const getOneResourceRequestParams: IGetOneResourceRequestParams = (
  query,
  resource,
) => {
  return {
    url: `${resource}/${query.id}`,
    method: 'GET',
    useAsync: true,
    useHospitalID: true,
  };
};

/**
 * Return "body" property from response
 */
export function transformResponseGeneric<T>(response: IGenericResponse<T>) {
  const { body } = response;
  return body;
}

/**
 * Return list data with total records and other types
 */
export function transformListResponseGeneric<T>(response: {
  body: T[] | null;
  header: IResponseHeader;
}): IGetManyResourceQueryResult<T> {
  const { body, header } = response;
  return {
    list: body || [],
    meta: {
      totalRecords: header?.totalRecords,
    },
  };
}

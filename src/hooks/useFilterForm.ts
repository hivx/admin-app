import { isEqual } from 'lodash';
import qs from 'qs';
import { useState, useEffect, useCallback, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { IGenericFilter, IGetManyResourcesQuery } from '@/types';
import { cleanObject } from '@/utils/format';

import { DEFAULT_QUERY } from './../lib/dataHelper/apiHelper';

type FilterFormOptions<T> = {
  /**
   * If true, this hook will store filter content as Query String paramters
   * to the browser's URL
   * By doing this, the user can use browser's Back or forward button without losing the current list
   */
  syncWithLocation?: boolean;
  /**
   * Initial filter state
   * @default {}
   */
  initialState?: T;
};

export type IUseFilterControl<T extends IGetManyResourcesQuery<IGenericFilter>> = {
  query: T;
  querySetter: {
    setFilter: (filter: T['filter']) => void;
    setPagination: (filter: T['pagination']) => void;
    setSort: (filter: T['sort']) => void;
    setQuery: (query: T) => void;
    setPage: (page: number) => void;
    setPerPage: (perPage: number) => void;
  };
};

/**
 * Control hook to use with any lists with pagination and sort support
 * Exports query object (filter, sort, pagination) and setter to update
 * the query
 * Automatically parse URL and filters sync with URL if syncWithLocation flag is enabled
 */
export const useFilterForm = <T extends IGetManyResourcesQuery<IGenericFilter>>(
  options: FilterFormOptions<T> = {},
): IUseFilterControl<T> => {
  const { syncWithLocation, initialState = DEFAULT_QUERY as T } = options;
  const location = useLocation();
  const { pathname, search } = location;

  const [query, setQuery] = useState<T>(initialState);

  const querySearch = convertQueryToURLSearchParam(query);
  const navigate = useNavigate();

  const updateURLSearchParams = useCallback(
    (query: T) => {
      const newSearch = convertQueryToURLSearchParam(query);
      navigate({
        pathname,
        search: newSearch,
      });
    },
    [navigate, pathname],
  );

  const setFilter = useCallback(
    (filter: T['filter']) => {
      setQuery((prevState) => {
        // set page to 1 when filter is changed
        const cleanedFilter = cleanObject(filter);
        if (!isEqual(cleanedFilter, prevState.filter)) {
          const newQ = {
            ...prevState,
            filter,
            pagination: {
              ...prevState.pagination,
              page: 1,
            },
          };
          syncWithLocation && updateURLSearchParams(newQ);
          return newQ;
        }
        return prevState;
      });
    },
    [syncWithLocation, updateURLSearchParams],
  );

  const setPagination = useCallback(
    (pagination: T['pagination']) => {
      setQuery((prevState) => {
        const newQ = { ...prevState, pagination };
        syncWithLocation && updateURLSearchParams(newQ);
        return newQ;
      });
    },
    [syncWithLocation, updateURLSearchParams],
  );

  const setPage = useCallback(
    (page: number) => {
      setQuery((prevState) => {
        const newQ = {
          ...prevState,
          pagination: {
            ...prevState.pagination,
            page,
          },
        };
        syncWithLocation && updateURLSearchParams(newQ);
        return newQ;
      });
    },
    [syncWithLocation, updateURLSearchParams],
  );

  const setPerPage = useCallback(
    (perPage: number) => {
      setQuery((prevState) => {
        const newQ = {
          ...prevState,
          pagination: {
            page: 1,
            perPage,
          },
        };
        syncWithLocation && updateURLSearchParams(newQ);
        return newQ;
      });
    },
    [syncWithLocation, updateURLSearchParams],
  );

  const setSort = useCallback(
    (sort: T['sort']) => {
      setQuery((prevState) => {
        const newQ = { ...prevState, sort };
        syncWithLocation && updateURLSearchParams(newQ);
        return newQ;
      });
    },
    [syncWithLocation, updateURLSearchParams],
  );

  useEffect(() => {
    // setQuery if the user supplies a different URL containing
    // different query value
    if (syncWithLocation && !isSearchEqual(search, querySearch)) {
      const newQuery = initializeQuery<T>(search);
      // console.log('set new query from URL', { search, newQuery });
      setQuery(newQuery);
    }
  }, [querySearch, search, syncWithLocation]);

  const querySetter = useMemo(
    () => ({
      setFilter,
      setPagination,
      setSort,
      setQuery,
      setPage,
      setPerPage,
    }),
    [setFilter, setPage, setPagination, setPerPage, setSort],
  );

  return {
    query,
    querySetter,
  };
};

const isSearchEqual = (locationSearch: string, querySearch: string) => {
  // location.search always has a leading '?', while search params from query
  // doesnt
  return querySearch.trim() === locationSearch.slice(1).trim();
};

const initializeQuery = <T extends IGetManyResourcesQuery<IGenericFilter>>(
  search: string,
) => {
  const newQuery = convertURLSearchParamToQuery<T>(search);
  if (!newQuery.filter) newQuery.filter = {};
  // parseInt for numeric types
  if (newQuery.pagination) {
    if (newQuery.pagination)
      newQuery.pagination.page = parseInt(newQuery.pagination.page as unknown as string);
    if (newQuery.pagination.perPage)
      newQuery.pagination.perPage = parseInt(
        newQuery.pagination.perPage as unknown as string,
      );
  }
  return { ...DEFAULT_QUERY, ...newQuery };
};

const convertURLSearchParamToQuery = <T extends IGetManyResourcesQuery<IGenericFilter>>(
  search: string,
) => qs.parse(search.slice(1)) as unknown as T; // slice(1) to remove '?'

const convertQueryToURLSearchParam = <T extends IGetManyResourcesQuery<IGenericFilter>>(
  query: T,
) => qs.stringify(query, { skipNulls: true });

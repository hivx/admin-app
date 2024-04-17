import { securedApi } from '@/lib/api';
import {
  getManyResourcesRequestParams,
  transformListResponseGeneric,
} from '@/lib/dataHelper/apiHelper';
import { IGetManyResourceQueryResult, IGetManyResourcesQuery } from '@/types';
import { IStoreDTO, IStoreDTOSearch } from '@/types/dto/store';
import { RESOURCES } from '@/types/resources';

const api = securedApi.injectEndpoints({
  endpoints: (builder) => ({
    getListStore: builder.query<
      IGetManyResourceQueryResult<IStoreDTO>,
      IGetManyResourcesQuery<IStoreDTOSearch>
    >({
      query: (arg) => {
        const request = getManyResourcesRequestParams(arg, RESOURCES.STORE);
        return request;
      },
      // https://redux.js.org/tutorials/essentials/part-8-rtk-query-advanced#invalidating-specific-items
      // https://redux-toolkit.js.org/rtk-query/usage/automated-refetching#tag-invalidation-behavior
      /**
       * provides a general 'store' tag for the whole list, as well as a specific
       * {type: 'store', id} tag for each received post object
       */
      providesTags: (result = { list: [], meta: { totalRecords: 0 } }) =>
        result.list
          ? [
              { type: RESOURCES.STORE, id: 'LIST' },
              ...result.list.map((item) => ({ type: RESOURCES.STORE, id: item.id })),
            ]
          : [],
      transformResponse: transformListResponseGeneric,
    }),
  }),
});

export const { useGetListStoreQuery, useLazyGetListStoreQuery } = api;

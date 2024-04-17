import { securedApi } from '@/lib/api';
import {
  getManyResourcesRequestParams,
  transformListResponseGeneric,
} from '@/lib/dataHelper/apiHelper';
import { IGetManyResourceQueryResult, IGetManyResourcesQuery } from '@/types';
import { IModuleDTO, ISearchModuleFilter } from '@/types/dto/module';
import { RESOURCES } from '@/types/resources';

const api = securedApi.injectEndpoints({
  endpoints: (builder) => ({
    getListModule: builder.query<
      IGetManyResourceQueryResult<IModuleDTO>,
      IGetManyResourcesQuery<ISearchModuleFilter>
    >({
      query: (arg) => {
        const request = getManyResourcesRequestParams(arg, 'module');
        return request;
      },
      // https://redux.js.org/tutorials/essentials/part-8-rtk-query-advanced#invalidating-specific-items
      // https://redux-toolkit.js.org/rtk-query/usage/automated-refetching#tag-invalidation-behavior
      /**
       *
       */
      providesTags: (result = { list: [], meta: { totalRecords: 0 } }) => [
        { type: RESOURCES.MODULE },
        ...result.list.map((item) => ({ type: RESOURCES.MODULE, id: item.id })),
      ],
      transformResponse: transformListResponseGeneric,
    }),
  }),
});

export const { useGetListModuleQuery } = api;
